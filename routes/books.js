//
const express = require('express'); //requires express functionality(for routing)
const router = express.Router();
const Book = require('../models').Book;//gives access to the book model file(book.js)

/* Handler function to wrap each route. (eliminates need to write try/catch over and over in each route)*/
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }
  

//   get /books - Shows the full list of books.
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["year", "DESC"]] });//{ order: [["createdAt", "DESC"]] } orders the results by time the were created desc. aka most recent at the top
    // const books = await Book.findByPk(1);
    console.log("books get request: ", books.id);
    res.render("index", { books: books });
    //res.render("index", { title: books.title, author: books.author, genre: books.genre, year: books.year });
  }));

//   get /books/new - Shows the create new book form.

router.get('/new', (req, res) => {
  res.render("new-book", { author: {}, title: "New Book" });
});

//   post /books/new - Posts a new book to the database.

  //create() method builds a new model instance and automatically stores it in the database(as a row)
  //create() is an asynchronous call that returns a promise
router.post('/', asyncHandler(async (req, res) => {
  console.log(req.body) //checking to make sure it returns: { title: '', author: '', body: '' } ---- (and obj w/ porps that map to the model attributes)
  const article = await Book.create(req.body); //req.body is the body of your request NOT equivalent to the body property of an article object//create requires an obj with props that map to the model attributes (article.js - id, title, body)
  res.redirect("/" + Book.id); //article.id concatenated on the end creates a unique url path for each query based on the id column
}));

  

//   get /books/:id - Shows book detail form.
//   post /books/:id - Updates book info in the database.
//   post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
  
  module.exports = router;

