const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // Define associations or additional configurations here
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.BlogPost, {
      foreignKey: 'blogPostId',
      onDelete: 'CASCADE',
    });
  };

  return Comment;
};
