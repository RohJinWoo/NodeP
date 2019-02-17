var express = require('express');
var session = require('express-session');
const nodemailer = require('nodemailer');
var router = express.Router();
const sampleController = require('../controllers').sample;

router.get('/', function(req, res, next) {
  res.render('sample/index', { title: 'Index', sql: [] });
});

router.post('/insert', sampleController.create, (req, res) => {
  res.render('sample/index', {title: 'Insert', sql: []})
});

router.get('/selectall', (req, res) => {
  sampleController.selectAll(req, res)
  .then(()=>{
    res.render('sample/index',{title: 'Select', sql:req.sql});
  })
  .catch(error => {
    console.log('err');
    res.status(400).send(error);
  });
});

router.post('/selectall', (req, res) => {
  sampleController.selectAll(req, res)
  .then(()=>{
    res.send(req.sql);
  })
  .catch(error => {
    console.log('err');
    res.status(400).send(error);
  });
});

router.post('/selectOneId', (req, res) => {
  sampleController.select(req, res, {
    type: 'id',
    data: req.body.id
  })
  .then(()=>{
    res.send(req.sql);
  })
  .catch(error => res.status(400).send(error));
})

router.post('/selectOne', (req, res) => {
  console.log(req.body.s_name)
  sampleController.select(req, res, {
    type: null,
    data: {where: {s_name: req.body.s_name}}
  })
  .then(()=>{
    res.send(req.sql);
  })
  .catch(error => res.status(400).send(error));
})

router.get('/passport', sampleController.middleware, (req, res) => {
  // console.log(req.body.s_name)
  // sampleController.select(req, res, {
  //   type: null,
  //   data: {where: {s_name: req.body.s_name}}
  // })
  // .then(()=>{
  //   res.send(req.sql);
  // })
  // .catch(error => res.status(400).send(error));
  res.send('success');
});

router.get('/email', (req, res) => {
  res.render('sample/email');
})

/* https://victorydntmd.tistory.com/113 */
router.post('/emailpost', (req, res) => {
  let email = req.body.email;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:'보낼놈',
      pass:'보낼놈 비밀번호'
    }
  });
  let token = 'qwer'
  let mailOptions = {
    from: '보낼 놈',
    to: email,
    subject: 'test mail node.js',
    html: '<h1>메일 인증</h1>' + email + '<a href="http://localhost:3000/sample/emailauth/?email=' + email + '&token=' + token + '">인증하기</a>'
  };

  transporter.sendMail(mailOptions, function(err, info){
    if(err){console.log(err);}
    else{console.log('email sent: ' + info.response);};
  });

  res.send(req.body.email);
})

router.get('/emailauth', (req, res) => {
  // req.query.email
  if(req.query.token == 'qwer'){
    res.send('인증');
  }
  res.send('미인증');
})

module.exports = router;
