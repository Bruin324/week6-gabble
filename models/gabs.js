'use strict';
module.exports = function (sequelize, DataTypes) {
  var gabs = sequelize.define('gabs', {
    description: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    author: DataTypes.STRING
  })

  gabs.associates = function(models) {
    gabs.hasMany(models.likes);
    gabs.belongsTo(models.users);
  }
  return gabs;
};