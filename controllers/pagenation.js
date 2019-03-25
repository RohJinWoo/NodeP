const Board = require('../models').Board;
module.exports = {
    // create(req, res, next){
    //     return Board
    // .create({
    //   b_no : req.body.no,
    //   b_title : "[title : " + req.body.no + "]",
    //   sub_name : "[name : " + req.body.no + "]",
    //   b_date : req.body.no,
    //   b_view : req.body.no
    // })
    // .then(result => {
    //   console.log('sample insert'); next();
    // })
    // .catch(error => res.status(400).send(error));
    // }

  count(req, res, next){
    return Board
    .count()
    .then(result => {
      console.log("cont : ", result);
      req.body.board_num = result;
      next();
    })
    .catch(error => res.status(400).send(error));
  }
};