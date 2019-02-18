'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // name: DataTypes.STRING
    u_name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    u_no: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    u_pw: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    u_email: {
      type:DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  // User.associate = function(models) {
  //   // associations can be defined here
  //   User.hasMany(models.Employee,{
  //     foreignKey: 'companyId',
  //     as: 'employees',
  //   });
  // };
  return User;
};