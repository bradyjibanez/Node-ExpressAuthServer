/*The meat n' taters: Allows for mongo/mongoose interation through specific url interaction definitions - controller methods.
Methods are defined to mesh CRUD with mongo cli calls, implying purpose and intention with tactile correlation*/

const randToken = require('rand-token');
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongo = require('_helpers/mongo');
const Environment = mongo.Environment;
const User = mongo.User;
const Hub = mongo.Hub;

module.exports = {
    create,
    claim,
    getById,
    getUserEnvs,
    update,
    delete: _delete
};

async function create(req) {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.split(':');
    ip = ip[ip.length - 1];
    let token = randToken.generate(64)
    req.body['configToken'] = token;
    req.body['claimToken'] = genClaimToken(token, ip)

    const env = new Environment(req.body);
    const user = await User.findById(req.body.admin)
    user.environments.push({"envName": env.envName, "envID": env._id}); 
    
    await user.save();
    await env.save();

    return token
}

async function claim(env_ip) {

    return await Environment.findOne({'envIp': env_ip}).select('-hash');
}

async function getById(id) {
    
    return await Environment.findById(id).select('-hash');
}

async function getUserEnvs(id) {

    envs = await Environment.find({ 'admin': id })
        .select(['envName', 'envLoc', 'envDesc', 'envType', 
                 'hubID', 'claimedStatus', 'configToken']);
    
    return envs;
}

async function update(req) {

    const env = await Environment.findById(req.body.id);

    // validate
    if (!env) throw 'Environment not found';

    // copy userParam properties to user
    Object.assign(env, req.body);
    await env.save();
}

async function _delete(id) {

    const environment = await Environment.findById(id)
    const user = await User.findById(environment.admin)
    const hub = await Hub.findOne({'admin': environment.admin})

    for (let i = 0; i < user.environments.length; i++) {
        if (String(user.environments[i].envID) === id) {
            user.environments.splice(i, 1);
        }
    }

    await user.save();
    await Environment.findByIdAndRemove(id);
    if (hub !== null) {
        await Hub.findByIdAndRemove(hub._id);
    }

    return true
}

function genClaimToken(token, ip) {

    let ip_redo = ip.split('.')
    for (let i = 0; i < ip_redo.length; i++) {
            let position = Math.ceil(token.length/(i+2));
            token = [token.slice(0, position), ip_redo[i], token.slice(position)].join('');
    }
    
    return token;    
}