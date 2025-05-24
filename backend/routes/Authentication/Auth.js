const express = require('express');
const {register,Login,Logout} = require('../../controllers/Authentication/Auth');

const AuthRoute = express.Router();
AuthRoute.post('/register', register)
AuthRoute.post('/login', Login)
AuthRoute.post('/loginout', Logout)

module.exports = AuthRoute