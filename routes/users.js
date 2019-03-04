
var express = require('express');
var session = require('express-session')
var router = express.Router();
const userController = require('../controllers').user;


router.post('/auth', userController.sign_auth, userController.create, function(req, res, next){
    console.log('회원가입 완료');
    res.redirect('/')
});

router.post('/sign', userController.create, function(req, res, next){
    console.log('회원가입 완료');
    res.redirect('/')
});

router.post('/find_no', userController.find_no, (req, res) => {
    console.log(req.body.u_name);
    userController.select(req, res, {
    type: 'u_no',
    data: {where: {u_name: req.body.u_name, u_email : req.body.u_email}}
  })
  .then(()=>{
    // res.send("찾으시는 학번은 <b>" + req.sql_u_no + "</b> 입니다.");
  })
  .catch(error => res.status(400).send(error));
});

router.post('/find_pw', userController.find_pw, (req, res) => {
    console.log(req.body.u_name);
    userController.select(req, res, {
    type: null,
    data: {where: {u_name: req.body.u_name, u_no : req.body.u_no, u_email : req.body.u_email}}
  })
  .catch(error => res.status(400).send(error));
});

router.post('/change_pw', (req, res) => {
    userController.update(req, res, {
      u_pw: req.body.u_pw
    }
    , {
    where: {u_name: req.body.u_name, u_no : req.body.u_no, u_email : req.body.u_email}
  })
  .catch(error => res.status(400).send(error));
});

module.exports = router;


// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/index', function(req, res, next) {
//   res.send('respond with a resource index');
// });
// module.exports = router;
