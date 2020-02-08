'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING, 
      allowNull: false, // disallow null requires a value for data to be submitted to db
      validate: {
        notEmpty: {
            msg: 'Please provide a value for "title"',
        }
      },
    },
    author: {
      type:  DataTypes.STRING,
      allowNull: false, // disallow null requires a value for data to be submitted to db
      validate: {
        notEmpty: {
            msg: 'Please provide a value for "author"',
        }
      },
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {sequelize});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};

//In the Book Model, add the appropriate validation to ensure 
  //that the title and author properties will have values when 
  //the form is submitted. See the project resources for a link 
  //to the video that covers this.