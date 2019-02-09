
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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/login', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', userController.login, function(req, res, next) {
  console.log('login')
  let sess = req.session;
  sess.userid = req.body['u_no'];
  sess.userpw = req.body['u_pw'];
  res.redirect('calendar')
  // res.render('calendar', { title: 'Express' });
});
/* DB API */
const companyController = require('../controllers').company;

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome API'
}));

router.get('/logout', userController.logout);

router.post('/api/company', companyController.create);

module.exports = router;
