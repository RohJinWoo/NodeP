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
        res.send('학번 없음');
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
    }
    next();
  }
};