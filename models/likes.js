'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userLiked: DataTypes.STRING
  })
  likes.associates = function(models) {
    // associations can be defined here
    likes.belongsTo(models.users);
    likes.belongsTo(models.gabs);
  }
  return likes;
};