// models/blogPost.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Add any other fields you need for a blog post

    // Example: userId for associating blog posts with users
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });

  // Define associations or additional configurations here
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    BlogPost.hasMany(models.Comment, {
      foreignKey: 'blogPostId',
      onDelete: 'CASCADE',
    });
  };

  return BlogPost;
};
