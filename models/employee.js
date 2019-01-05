// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Employee = sequelize.define('Employee', {
//     name: DataTypes.STRING,
//     designation: DataTypes.STRING,
//     salary: DataTypes.NUMBER
//   }, {});
//   Employee.associate = function(models) {
//     // associations can be defined here
//   };
//   return Employee;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    salary: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Company,{
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    });
  };
  return Employee;
};