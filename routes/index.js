
/* 
req: 클라이언트 요청을 담은 객체,
res: 요청한 클라이언트로 응답을 위한 객체
next: 다음 로직 수행을 위한 함수명
*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
