var express = require('express');
var session = require('express-session');
const nodemailer = require('nodemailer');
var router = express.Router();

/* https://victorydntmd.tistory.com/113 */
router.post('/emailpost', (req, res) => {
    let email = req.body.email;
  
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'syncjw19@gmail.com',
        pass:'4321wasd'
      }
    });
    console.log('email');
    console.log(email);

    let token;
    switch(req.body.req){
      case 'sign_up':
        token = 'qwer';
        break;
      case 'find_no':
        token = 'qwert';
        break;
      case 'find_pw':
        token = 'qwerty';
        break;
      default:
        break;
    };

    let mailOptions = {
      from: 'syncjw19@gmail.com',
      to: email,
      subject: 'test mail node.js',
      html: '<h1>메일 인증</h1>' + email + '<p><a href="http://localhost:3000/email/emailauth/?email=' + email + '&token=' + token + '">인증하기</a></p>'
    };
  
    transporter.sendMail(mailOptions, function(err, info){
      if(err){console.log(err);}
      else{console.log('email sent: ' + info.response);};
    });
  
    res.send(req.body.email);
  })
  
  // email 인증(성공시 session값 생성, 실패시 nothing)
  router.get('/emailauth', (req, res) => {
    // req.query.email
    let sess = req.session;

    switch(req.query.token){
      case 'qwer':
        sess.email_auth = "qwer";
        break;
      case 'qwert':
        sess.email_auth = "qwert";
        break;
      case 'qwerty':
        sess.email_auth = "qwerty";
        break;
      default:
        res.send('미인증');
    }
    console.log(sess.email_auth);
    res.send('인증 완료');
  })
  
  module.exports = router;
  