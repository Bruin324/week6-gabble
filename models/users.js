'use strict';
module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  })

  users.associate =  function(models) {
    users.hasMany(models.gabs);
    users.hasMany(models.likes);
  }
  return users;
};