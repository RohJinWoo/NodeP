
// /* 
// req: 클라이언트 요청을 담은 객체,
// res: 요청한 클라이언트로 응답을 위한 객체
// next: 다음 로직 수행을 위한 함수명
// */
var express = require('express');
var router = express.Router();
var session = require('express-session')

// /* GET home page. */
router.get('/', function(req, res, next) {
  /* 
  세션확인 후 세션이 있으면 세션값에서 데이터를 불러와 calendar를 리턴
  세션이 없으면 sql을 통해서 세션값 생성해 값넣어주고 calendar를 리턴

  세션에 u_name, isStudent, timetable or subject, 

  u_name 리턴.
  오늘 날짜의 월력(new date객체), 유저의 강의 일정(교수는 강의하는 일정, 학생은 듣는 강의 일정). 
  로그인해서 user의 u_no로 학생,교수인지 비교 후 boolean 값 리턴
  1. 학생일때 timetable의 sub_no로 schedule를 찾음, sub_no로 sub_name도 찾음
  2. 교수일때 subject의 sub_no로 schedule를 찾음, sub_no로 sub_name도 찾음
  오늘 날짜 리턴, schedule 객체 리턴, sub_name 리턴.
  교수일 경우 subject 객체 리턴
  학생일 경우 timetable 객체 리턴
  */
//  schedule: schedule,
  let sess = req.session;
  let id = sess.userid;
  let pw = sess.userpw;

  if(id == undefined){
    console.log('??')
    res.redirect('/')
    return;
  }

  res.render('calendar',{title:''});
  // res.render('calendar', { u_name, isStudent: boolean, today: obj1, schedule, sub_name, 
  //   isStudent ? timetable : subject });
});

// router.post('/add', function(req, res, next) {
//   /* ajax.
//   schedule 테이블 추가. 
//   캘린더에서 필요한 값을 찾아서 ajax 리턴
//   */
// });

// router.post('/delete', function(req, res, next) {
//   /* ajax.
//   schedule 테이블 삭제. 
//   캘린더에서 필요한 값을 찾아서 ajax 리턴
//   */
// });

// router.post('/modify', function(req, res, next) {
//   /* ajax.
//   해당 schedule의 키를 보내고 그걸 수정. 
//   캘린더에서 필요한 값을 찾아서 ajax 리턴
//   */
// });

// /* DB API */
// const companyController = require('../controllers').company;

// router.get('/api', (req, res) => res.status(200).send({
//   message: 'Welcome API'
// }));

// router.post('/api/company', companyController.create);

module.exports = router;
