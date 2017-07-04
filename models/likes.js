'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userLiked: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gabId: DataTypes.INTEGER
  })
  likes.associate = function (models) {
    likes.belongsTo(models.gabs);
  }
  return likes;
};