'use strict';
module.exports = function (sequelize, DataTypes) {
  var gabs = sequelize.define('gabs', {
    description: DataTypes.STRING,
    numLikes: DataTypes.INTEGER,
    author: DataTypes.STRING
  })

  gabs.associates = function(models) {
    // associations can be defined here
    gabs.hasMany(models.likes);
    gabs.belongsTo(models.users);
  }
  return gabs;
};