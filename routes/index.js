
/* 
req: 클라이언트 요청을 담은 객체,
res: 요청한 클라이언트로 응답을 위한 객체
next: 다음 로직 수행을 위한 함수명
*/
var express = require('express');
var session = require('express-session')
var router = express.Router();
const userController = require('../controllers').user;

/* GET home page. */
router.get('/', (req, res) => {
  let obj = { title : 'Express' };
  obj.u_no = req.session.u_no !== undefined ? req.session.u_no : undefined;
  res.render('index', { obj : obj });
});

// router.get('/login', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', userController.login, function(req, res, next) {
  let sess = req.session;
  console.log('login');
  sess.userid = req.body['u_no'];
  sess.userpw = req.body['u_pw'];
  res.redirect('calendar')
  // res.render('calendar', { title: 'Express' });
});

router.get('/sign_up', userController.login_access, function(req, res, next){
  let sess = req.session;
  sess.email_auth !== undefined ? sess.email_auth.req = "sign_up" : sess.email_auth = {req : "sign_up"};
  // sess.email_auth = {req : 'sign_up'};
  console.log(sess.email_auth);
  res.render('sign_up',{obj:{title:'회원가입'}});
});

router.get('/find_no', userController.login_access, function(req, res, next){
  let sess = req.session;
  sess.email_auth !== undefined ? sess.email_auth.req = "find_no" : sess.email_auth = {req : "find_no"};
  // sess.email_auth = {req : 'find_no'};
  console.log(sess.email_auth);
  res.render('find_no',{obj:{title:'학번 찾기'}});
});

router.get('/find_pw', userController.login_access, function(req, res, next){
  let sess = req.session;
  sess.email_auth !== undefined ? sess.email_auth.req = "find_pw" : sess.email_auth = {req : "find_pw"};
  // sess.email_auth = {req : 'find_pw'};
  console.log(sess.email_auth);
  res.render('find_pw',{obj:{title:'비밀번호 찾기'}});
});


/* DB API */
const companyController = require('../controllers').company;

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome API'
}));

router.get('/logout', userController.logout);

router.post('/api/company', companyController.create);

module.exports = router;
