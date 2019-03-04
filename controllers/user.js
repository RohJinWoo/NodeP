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
      req.session.destroy();
      res.clearCookie('sid');
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

  // sign_up
  sign_auth(req, res, next){
    if(req.session.email_auth === "qwer"){
      console.log('이메일 인증 완료된 상태 sign_auth');
      req.session.destroy();
      res.clearCookie('sid');
      next();
    }else{
      console.log('이메일 인증 필요');
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

  find_no(req, res, next){
    if(req.session.email_auth === "qwert"){
      console.log('이메일 인증 완료된 상태 find_no');
      req.session.destroy();
      res.clearCookie('sid');
      next();
    }else{
      console.log('이메일 인증 필요');
      res.redirect('/');
    }
  },

  select(req, res, config){
    if(config.type === 'u_no'){
      return User.findOne(config.data)
      .then(result => {
        result !== undefined ? res.redirect('/?u_no='+result.u_no) : res.send('이름, 이메일을 확인 후 다시 입력해주세요.');
      });
    }else{
      return User.findOne(config.data)
      .then(result => {
        result !== undefined ? res.render('change_pw',{ obj : { title : '비밀번호 재설정', user : req.body } } ) : res.send('학번, 이름, 이메일을 확인 후 다시 입력해주세요.');
      });
    }
  },

  find_pw(req, res, next){
    if(req.session.email_auth === "qwerty"){
      console.log('이메일 인증 완료된 상태 find_pw');
      req.session.destroy();
      res.clearCookie('sid');
      next();
    }else{
      console.log('이메일 인증 필요');
      res.redirect('/');
    }
  },

  update(req, res, pw, config){
    return User.update(pw, config)
    .then(result => {
      res.redirect('/?u_no=' + req.body.u_no);
    })
  }
};