/*The meat n' taters: Allows for mongo/mongoose interation through specific url interaction definitions - controller methods.
Methods are defined to mesh CRUD with mongo cli calls, implying purpose and intention with tactile correlation*/

const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/mongo');

const User = db.User;

module.exports = {
    authenticate,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username: username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        for (let i = 0; i < user.environments.length; i++) {
            user.environments[i] = user.environments[i].envName;
        }
        for (let i = 0; i < user.packages.length; i++) {
            user.packages[i] = user.packages[i].packageName;
        }
        const { hash, ...user_without_hash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...user_without_hash,
            token
        };
    }
}

async function getById(id) {
    let user = await User.findById(id).select('-hash');
    return user;
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user_param = JSON.parse(JSON.stringify(userParam));
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== user_param['username'] && await User.findOne({ username: user_param.username })) {
        throw 'Username "' + user_param.username + '" is already taken';
    }

    // hash password if it was entered
    if (user_param.password) {
        user['hash'] = bcrypt.hashSync(user_param.password, 10);
    }

    for (attribute in userParam) {
        if (user_param[attribute] != '') {
            user[attribute] = user_param[attribute];
        }
    }

    // copy userParam properties to user
    await user.save();

    const { hash, ...user_without_hash } = user.toObject()
    const token = jwt.sign({ sub: user.id }, config.secret);
    
    return {
        ...user_without_hash,
        token
    };
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}