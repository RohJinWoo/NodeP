var express = require('express');
var session = require('express-session')
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


module.exports = router;
