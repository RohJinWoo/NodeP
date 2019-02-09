const Sample = require('../models').Sample;
module.exports = {
  
  /* 
  Sample 모델을 사용하는 쿼리에 대한것을 이곳에서 작성
  model의 컨트롤러 부분으로 추가, 삭제, 검색, 수정을 할 수 있음. 
  */
  create(req, res, next) {
    console.log('sample create middleware')
    return Sample
    .create({
      s_name: req.body.name,
    })
    .then(result => {
      console.log('sample insert'); next();
    })
    .catch(error => res.status(400).send(error));
  },
  /* 
  요청이 들어왔을때 요청에 담긴 name 값을 s_name에 넣어줌. 해당 쿼리가 성공했을 시
  then으로 넘어가고 next()함수로 미들웨어를 끝내고 다음 흐름을 호출한다.
  쿼리가 실패했을 시 catch를 호출하여 에러 페이지 응답을 해주고 흐름을 종료한다.
  이건 미들웨어로 사용했을때 
  */

  selectAll(req, res) {
    console.log('sample select limit 10')
    return Sample.findAndCountAll({
      limit: 10
    })
    .then(result => {
      console.log(result.count);
      req.sql = result.rows;
    })
  },
  /* 
  findAndCountAll이라는 시퀄라이즈 함수로 해당 값들을 찾음. 시퀄라이즈를 통한 쿼리
  사용법은 문서를 참조. 성공했을 시 result의 count, rows를 받을 수 있고 해당 응답을 하면 되지만 
  그 전에 req 요청객체에 값을 넣어주고 Promise 객체인걸 그대로 return. *시퀄라이즈는 promise객체를 사용한다.
  */

  select(req, res, config) {
    /* 
    select문은 2가지로 id로 찾는거, 조건문을 줘서 찾는것이 있다. 따라서 이 함수를 미들웨어로 사용할 때
    type에 다른 값을 줘서 시퀄라이즈의 다른 함수를 불러오도록 한다. 굳이 이렇게 안하고 분리할 수 있지만
    하나의 값을 찾는 것은 같고 이러한 방법으로도 미들웨어를 사용할 수 있다는것을 예제로 삼기위해 작성해봄.
    data라는 2번째 값에는 어떠한 조건으로 찾을지에 대한 것이다. id같은 경우 호출할 때 그냥 id값을 넣
    어주면 되고 findOne일 경우 조건 객체를 넣어줘야한다.
    {where: {s_name: 'test'}, attributes: ['id', ['name','title']]} 이러한 값을 넣으면 되고
    where부분만 넣어도 된다. where말고 다른 조건들을 넣는 방법은 문서를 좀 더 참고해봐야할 듯.

    값이 한개이므로 result에 담김
    */
    if(config.type === 'id'){
      return Sample.findById(config.data)
      .then(result => {
        req.sql = result;
      })
    } else {
      return Sample.findOne(config.data)
      .then(result => {
        req.sql = result;
      })
    }
  },

  middleware(req, res, next) {
    console.log('middleware check');
    console.log(req);
    next();
    // return Sample
    // .create({
    //   s_name: req.body.name,
    // })
    // .then(result => {
    //   console.log('sample insert'); next();
    // })
    // .catch(error => res.status(400).send(error));
  },
};