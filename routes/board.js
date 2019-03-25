
/* 
req: 클라이언트 요청을 담은 객체,
res: 요청한 클라이언트로 응답을 위한 객체
next: 다음 로직 수행을 위한 함수명
*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /* 
  세션에 u_name, isStudent, timetable or subject, 
  
  로그인 확인. 교수면 교수가 등록한 강의들 목록 subject를 session에서 가져옴.
  subject로 과제게시판 sql 조회해서 가져오고 board 객체 리턴.
  학생이면 timetable을 session에서 가져와서 subject로 과제게시판 sql
  조회해서 board 객체 리턴.

  페이지네이션을 위한 param들에 따라 sql을 다르게 조회할수 있는 로직 필요.
  */
  res.render('board', { obj : { title: 'Express' } });
  // res.render('board', { u_name, isStudent: boolean, today: obj1, b_no, b_title, sub_name, b_date, b_view });
});

// router.get('/login', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* DB API */
const companyController = require('../controllers').company;

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome API'
}));

router.post('/api/company', companyController.create);

module.exports = router;
