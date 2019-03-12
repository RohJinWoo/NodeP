const User = require('../models').User;
module.exports = {

  login(req, res, next) {
    return User
    .findOne({
      where: {u_no: req.body.u_no}
    })
    .then(result => {
      if(result){
        console.log('학번 있음');
        console.log(result.u_pw);
        if(result.u_pw === req.body.u_pw){
          console.log('패스워드도 같음');
          next();
        } else {
          console.log('패스워드가 다름');
          res.send('패스워드 다름');
        }
      } else {
        console.log('학번 없음');
        res.render('', {obj:{message: '학번없음'}});
      }
    })
    .catch(error => res.status(400).send(error));
  },

  logout(req, res){
    if(req.session.userid !== undefined){
      console.log('로그인 세션 존재');
      console.log('logout');
      req.session.userid = undefined;
    } else {
      console.log('세션에 id값 존재하지 않음');
    }
    res.redirect('/');
  },

  login_access(req, res, next){
    if(req.session.userid !== undefined){
      console.log('로그인 세션 존재');
      res.redirect('/calendar');
    }else{
      console.log('로그인 세션 존재하지 않음');
      next();
    }
  },

  // 인증 미들웨어로 회원가입, 학번찾기, pw찾기에 따라 token의 값이 다름.
  // 입력된 이메일 값과 인증받을때 사용한 이메일 값이 다른경우 false
  // 요청하는 페이지와 token이 서로 다른 경우 false
  email_auth(req, res, next){
    console.log(req.session.email_auth)
    let email_auth = req.session.email_auth;
    if(email_auth.auth === "qwer" && email_auth.req === 'sign_up' && email_auth.email === req.body.u_email)
    {
      console.log('이메일 인증 완료된 상태 sign_auth');
      req.session.email_auth = undefined;
      next();
    }
    else if(email_auth.auth === "qwert" && email_auth.req === 'find_no' && email_auth.email === req.body.u_email)
    {
      console.log('이메일 인증 완료된 상태 find_no');
      req.session.email_auth = undefined;
      next();
    }
    else if(email_auth.auth === "qwerty" && email_auth.req === 'find_pw' && email_auth.email === req.body.u_email)
    {
      console.log('이메일 인증 완료된 상태 find_pw');
      req.session.email_auth = undefined;
      next();
    }
    else
    {
      console.log('절차 무시 ㄴㄴ');
      res.redirect('/');
    }
  },

  create(req, res, next){
    console.log('create user');
    return User
    .create({
      u_name : req.body.u_name,
      u_no : req.body.u_no,
      u_pw : req.body.u_pw,
      u_email : req.body.u_email
    })
    .then(result => {
      console.log('sample insert'); next();
    })
    .catch(error => res.status(400).send(error));
  },

  select(req, res, config){
    if(config.type === 'u_no'){
      return User.findOne(config.data)
      .catch(error => {
        console.log('err',error);
        res.status(400).send(error)
      });
    }else{
      return User.findOne(config.data)
      .catch(error => {
        console.log('err',error);
        res.status(400).send(error)
      });
    }
  },

  update(req, res, pw, config){
    return User.update(pw, config)
    .catch(error => {
      console.log('err',error);
      res.status(400).send(error)
    });
  }
};