const express = require('express');
const jwt = require('../utils/jwt');
const app = express.Router();

const ExpanceCtrl = require('../controllers/expance.ctrl');

app.route('/').get(ExpanceCtrl.welcomeExpance);

app.route('/sign-up').post(ExpanceCtrl.signupfunc);
app.route('/login').post(ExpanceCtrl.loginFunc);
app.route('/addCategory').post(jwt.jwtTokenVerify, ExpanceCtrl.addCategoryFunc);
app.route('/getCategory').get(jwt.jwtTokenVerify, ExpanceCtrl.getCategoryFunc);
app.route('/addExpanse').post(jwt.jwtTokenVerify, ExpanceCtrl.addExpanseFunc);
app.route('/getExpanse').post(jwt.jwtTokenVerify, ExpanceCtrl.getExpanseFunc);
module.exports = app;