
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
  req.query.u_no !== undefined ? (obj.u_no = req.query.u_no) : null;
  res.render('index', { obj });
});

// router.get('/login', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', userController.login, function(req, res, next) {
  console.log('login');
  let sess = req.session;
  sess.userid = req.body['u_no'];
  sess.userpw = req.body['u_pw'];
  res.redirect('calendar')
  // res.render('calendar', { title: 'Express' });
});

// get접근 처리 필요(※로그인 후 url입력 접근 말고 페이지 뒤로가기 후 회원가입 및 id/pw 찾기는 막은 상태)
router.post('/sign_up', userController.login_access, function(rep, res, next){
  console.log('sign_up');
  res.render('sign_up',{obj:{title:'회원가입'}});
});

// get접근 처리 필요(※로그인 후 url입력 접근 말고 페이지 뒤로가기 후 회원가입 및 id/pw 찾기는 막은 상태)
router.post('/find_no', userController.login_access, function(rep, res, next){
  console.log('find_no');
  res.render('find_no',{obj:{title:'학번 찾기'}});
});

// get접근 처리 필요(※로그인 후 url입력 접근 말고 페이지 뒤로가기 후 회원가입 및 id/pw 찾기는 막은 상태)
router.post('/find_pw', userController.login_access, function(rep, res, next){
  console.log('find_pw');
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
