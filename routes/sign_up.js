
var express = require('express');
var session = require('express-session')
var router = express.Router();
const userController = require('../controllers').user;


router.post('/auth', userController.email_auth, userController.create, function(req, res, next){
    console.log('회원가입 완료');
    res.redirect('/')
});

router.post('/sign', userController.create, function(req, res, next){
    console.log('회원가입 완료');
    res.redirect('/')
});

module.exports = router;
