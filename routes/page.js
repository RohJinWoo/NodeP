
var express = require('express');
var session = require('express-session')
var router = express.Router();
const boardController = require('../controllers').pagenation;

router.post('/count_board_num', boardController.count, function(req, res, next){
    console.log('rou : ', req.body.board_num);
    console.log('rou : ', typeof(req.body.board_num));
    res.send({ board_num : req.body.board_num });
});


module.exports = router;
  