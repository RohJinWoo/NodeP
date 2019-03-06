const User = require('../models').User;
module.exports = {

  login(req, res, next) {
    return User
    .findOne({
      where: {u_no: req.body.u_no}
    })
    .then(result => {
      // console.log('sample insert'); next();
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
      
      // User.findOne({
      //   where: {}
      // })
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

  email_auth(req, res, next){
    console.log(req.session.email_auth)
    if(req.session.email_auth.auth === "qwer" && req.session.email_auth.req === 'sign_up'){
      console.log('이메일 인증 완료된 상태 sign_auth');
      req.session.email_auth = undefined;
      next();
    }else if(req.session.email_auth.auth === "qwert" && req.session.email_auth.req === 'find_no'){
      console.log('이메일 인증 완료된 상태 find_no');
      req.session.email_auth = undefined;
      next();
    }else if(req.session.email_auth.auth === "qwerty" && req.session.email_auth.req === 'find_pw'){
      console.log('이메일 인증 완료된 상태 find_pw');
      req.session.email_auth = undefined;
      next();
    }
    else{
      console.log('이메일 인증 필요');
      res.redirect('/');
    }
  },

  // sign_up
  // sign_auth(req, res, next){
  //   if(req.session.email_auth === "qwer"){
  //     console.log('이메일 인증 완료된 상태 sign_auth');
  //     req.session.email_auth = undefined;
  //     next();
  //   }else{
  //     console.log('이메일 인증 필요');
  //     res.redirect('/');
  //   }
  // },

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

  // find_no(req, res, next){
  //   if(req.session.email_auth === "qwert"){
  //     console.log('이메일 인증 완료된 상태 find_no');
  //     req.session.email_auth = undefined;
  //     next();
  //   }else{
  //     console.log('이메일 인증 필요');
  //     res.redirect('/');
  //   }
  // },

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

  // find_pw(req, res, next){
  //   if(req.session.email_auth === "qwerty"){
  //     console.log('이메일 인증 완료된 상태 find_pw');
  //     req.session.email_auth = undefined;
  //     next();
  //   }else{
  //     console.log('이메일 인증 필요');
  //     res.redirect('/');
  //   }
  // },

  update(req, res, pw, config){
    return User.update(pw, config)
    .catch(error => {
      console.log('err',error);
      res.status(400).send(error)
    });
  }
};