/* Used to define all uri routes based on logic seen in user.service definitions*/

const randToken = require('rand-token');
const express = require('express');
const router = express.Router();
const envService = require('./environments.service');

// routes
router.post('/create', create);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.get('/configure', claim);
router.post('/update', update)
router.get('/get_user_envs/:id', getUserEnvs);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    envService.create(req)
        .then(token => token ? res.json(token) : res.sendStatus(409))
        .catch(err => console.log(err));
}

function claim(req, res, next) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.split(':');
    ip = ip[ip.length - 1];
    envService.claim(ip)
        .then(env => env ? res.json(env) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserEnvs(req, res, next) {
    envService.getUserEnvs(req.params.id)
        .then(env => envs ? res.json(envs) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    envService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    envService.getById(req.params.id)
        .then(env => env ? res.json(env) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    envService.update(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    envService.delete(req.params.id)
        .then(del_status => del_status ? res.json({"status": "success"}) : res.sendStatus(409))
        .catch(err => res.sendStatus(409));
}
