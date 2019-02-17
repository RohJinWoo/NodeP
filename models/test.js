'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    t1: DataTypes.STRING,
    t2: DataTypes.STRING,
    t3: DataTypes.STRING
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};