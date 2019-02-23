var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    calendarRouter = require('./routes/calendar'),
    boardRouter = require('./routes/board'),
    sampleRouter = require('./routes/sample');
    emailRouter = require('./routes/email');
    sign_upRouter = require('./routes/sign_up');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'sid',
  secret: 'sync',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'axios', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/calendar', calendarRouter);
app.use('/board', boardRouter);
app.use('/sample', sampleRouter);
app.use('/email', emailRouter);
app.use('/sign_up', sign_upRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Models
var models = require('./models');
//Sync Database
models.sequelize.sync().then(function(){
  console.log('Databas Sync.');
}).catch(function(err){
  console.log(err, 'Something went wrong with the Database update');
})

module.exports = app;
