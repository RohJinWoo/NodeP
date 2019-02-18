# nodeApp

## node webserver portfolio

<<<<<<< HEAD
처음 파일 받았을때 설정
>1. npm i -S 실행
>2. config/config.json 파일 developer의 username, password를 자신의 mysql설정에 맞춰줌
>3. "database_development" 데이터 베이스 생성
>4. sequelize db:migrate
>5. npm start
=======

파일 구조
=====
> /bin
>> www
>
> /public
>> /images
>> 
>> /javascripts
>>
>> /stylesheets
>
> /routes
>> index.js
>>
>> users.js
>
> /views
>> index.ejs
>
> app.js
>
> package.json

### package.json

>프로그램 이름, 버전 등 노드 프로그램의 정보를 기술하는 파일. 또한 필요에 따라 다양한 모듈을 함께 사용하는데 이러한 모듈들의 목록을 나열한다. NPM은 이 정보를 참고하여 필요한 모듈을 모두 설치할 수 있다.

### bin/www

>서버 구동을 위한 코드가 기록되어 있다. 익스프레스 서버 설정 코드가 기록된 app.js 파일을 가져와 노드의 HTTP 객체와 연동하는 작업이 이뤄진다.

### app.js

>bin/www 에서 사용되는 이 파일은 익스프레스 설정 파일이 담겨있는 핵심 코드다. 
>> morgan : 클라이언트의 HTTP 요청 정보를 로깅하는 모듈
>>
>> body-parser : 클라이언트의 HTTP 요청 중 POST 요청의 바디 데이터에 접근하기 위한 모듈
>>
>> cookie-parser : 접속한 클라이언트의 쿠키 정보에 접근하기 위한 모듈
>>
>> express.static() : 정적 파일 호스팅을 위한 경로 설정
>>
>> app.use('/', routes) : 라우팅 설정. 세부 라우팅은 /routes 폴더에 구현됨

### /routes

>라우팅을 위한 폴더다. 라우팅 리소스 별로 모듈을 만들어 라우팅 로직을 각 파일에 구현한다.

### /views/index.ejs

>템플릿 파일인 ejs. 이 파일을 통해 HTML코드로 변환된다. 라우팅 로직에서 render() 함수에서 파라미터로 이 파일을 사용한다.

### /public

>정적 파일을 위한 폴더로서 js, image, css 등을 포함한다. 브라우저에 로딩된 HTML 파일에서 해당 파일을 호출하면 내려주는 역할을 한다.

구동
=====

익스프레스 설치 후 npm start
기본: http://localhost:3000

라우팅
=====

클라이언트의 요청을 위한 URL스키마를 라우트라고 한다. URL 스키마는 서버와 클라이언트같의 통신 인터페이스를 제공해 주는 역할을 한다.

함수의 첫번째 파라미터에는 '/' url

>GET: router.get()
>
>POST: router.post()
>
>PUT: router.put()
>
>DELETE: router.delete()

두번째 파라미터는 콜백으로 설정하는데 URL에 접속했을때 실행되는 함수다. 

>req: 클라이언트 응답에 대한 정보를 담는 객체로 req.params, rea.param(), req.body 등으로 클라이언트로부터 요청하는 데
이터에접근할 수 있다. 예를 들어 페이지네이션을 위해 일부 데이터만 요청할 때 GET /users?limit=10&skip=20 으로 요청할 수 있다.

```javascript
app.get('/', function (req, res) {
  res.send('list of users. limit: ' + req.param('limit') +
    'skip: ' + req.param('skip'));
});
```

>http://localhost:3000/users?limit=10&skip=20

>res: 클라이언트로 응답을 위한 객체다.
>>res.send(): 문자열로 응답
>>
>>res.json(): 제이슨 객체로 응답
>>
>>res.render(): 템플릿으로 렌더링
>>
>>res.sendfile(): 파일 다운로드

템플릿
=====

```javascript
//app.js view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

```javascript
// /routes/index.js
var express = require('express');
var router = express.Router();
// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
```

>render(view, locals)로 뷰는 /views/index.ejs를 렌더링한다.
locals는 템플릿 파일에 주입할 객체다. 

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

미들웨어
=====

```javascript
var express = require('express');
var app = express();

app.use(function middleware1(req, res, next) {
  console.log('middleware1: 인증작업...')
  if (/*인증 되었으면*/) {
    next();
  } else {
    next(new Error('Unauthorized'))
  }
});
app.use(function middleware2(req, res, next) {
  console.log('middleware2: 로깅작업...')
  next();
});
app.use(function middleware2(err, req, res, next) {
  if (err) {
    if (err.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    return res.satus(400).send('BadRequest');
  }
  next()
});
```

>미들웨어는 익스프레스 어플리케이션 객체의 use()메소드로 설정한다. 미들웨어는 함수형태로 구현하며 
이 함수는 req, res, next라는 파라미터를 설정한다. req, res를 이용해 비지니스 로직을 구현하고
미들웨어의 역할 수행을 마친 뒤 next()를 호출한다. next()는 다음에 설정된 미들웨어를 호출하거나
라우팅 로직을 수행하는 역할을 한다.

>코드의 미들웨어1은 요청객체를 이용해 인증여부를 검사하는 미들웨어고 인증되면 next()로 다음 로직을 
수행하며 그렇지 않을 경우 next()에 에러 인스턴스를 넘겨준다.
인증에 통과하면 미들웨어2를 수행한다. 이건 로깅 작업하고 다음 로직을 호출한다.

>미들웨어3은 파라미터 처음이 err다. 에러를 처리하는 미들웨어의 인터페이스로 next(에러객체)를 
호출하게되면 이 에러 미들웨어가 동작하게 된다.

>>인증에 성공했을 때: 미들웨어1 > 미들웨어2 > 라우팅로직 > 응답
>>
>>인증에 실패했을 때: 미들웨어1 > 미들웨어3 > 응답
>>>>>>> sync
