
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

router.post('/find_no', userController.email_auth, (req, res) => {
    console.log(req.body.u_name);
    userController.select(req, res, {
    type: 'u_no',
    data: {where: {u_name: req.body.u_name, u_email : req.body.u_email}}
  })
  .then(result =>{
    console.log("?",result)
    if(result !== null){
      let sess = req.session
      sess.u_no = result.u_no;
      res.redirect('/');
    }
    else{
      res.send('학번, 이름, 이메일을 확인 후 다시 입력해주세요.');
    }
  })
  .catch(error => {
    console.log('err',error);
    res.status(400).send(error)
  });
});

router.post('/find_pw', userController.email_auth, (req, res) => {
    console.log(req.body.u_name);
    userController.select(req, res, {
    type: null,
    data: {where: {u_name: req.body.u_name, u_no : req.body.u_no, u_email : req.body.u_email}}
  })
  .then(result => {
    if(result !== null){
      let sess = req.session
      sess.u_no = req.body.u_no;
      sess.u_name = req.body.u_name;
      sess.u_email = req.body.u_email;
      res.render('change_pw', { obj : { title : '비밀번호 재설정' } });
    }else{
      res.send('학번, 이름, 이메일을 확인 후 다시 입력해주세요.');
    }
  })
  .catch(error => {
    console.log('err',error);
    res.status(400).send(error)
  });
});

router.post('/change_pw', (req, res) => {
    userController.update(req, res, {
      u_pw: req.body.u_pw
    }
    , {
    where: {u_name: req.session.u_name, u_no : req.session.u_no, u_email : req.session.u_email}
  })
  .then(result => {
    if(result !== null){
      req.session.u_name = undefined;
      req.session.u_email = undefined;
      res.redirect('/');
    }else{
      res.send('에러발생');
    }
  })
  .catch(error => {
    console.log('err',error);
    res.status(400).send(error)
  });
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
