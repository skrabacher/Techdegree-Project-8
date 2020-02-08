//
const express = require('express'); //requires express functionality(for routing)
const router = express.Router();
const Book = require('../models').Book; //gives access to the book model file(book.js)

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
  res.render("new-book", { book: {}, title: "New Book" });//passes empty book object that will hold the new input values entered into the form
});

//   post /books/new - Posts a new book to the database.

  //create() method builds a new model instance and automatically stores it in the database(as a row)
  //create() is an asynchronous call that returns a promise
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    console.log("post books/new: ", req.body) //checking to make sure it returns: { title: '', author: '', body: '' } ---- (and obj w/ props that map to the model attributes)
    const book = await Book.create(req.body); //req.body is the body of your request NOT equivalent to the body property of an book object//create requires an obj with props that map to the model attributes (book.js - title, author, genre, year)
    //res.render("/form-error", { error });
    res.redirect("/books"); 
  } catch (error) {
    console.log("error: ", error.name, error.status);
    if(error.name === "SequelizeValidationError") { //if validation error, render the form-error pug view and pass the error object as local var to pug view
      book = await Book.build(req.body); 
      console.log("validation error req.body: ", req.body);
      res.render("form-error", { error });
    } else {
      throw error; 
    }  
  }
  
}));

  

//   get /books/:id - Shows book detail form.

/* GET individual book. */ //displays a book based on the id in the url path
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id); //Book=book module, then find by using the number entered in the route as a parameter defined as id
  console.log("CONSOLE LOG: ", book); //just to see what the returned data looks like
  res.render("update-book", { book: book, title: book.title, id: book.id }); //book: book - the first book is the container for the local variable that is passed to pug
  //render method defaults to views path as defined in the app.js file with app.set in the view engine setup [app.set('views', path.join(__dirname, 'views'));]
}));

//   post /books/:id - Updates book info in the database.

router.post("/:id", asyncHandler(async (req, res) => {
  console.log("post books/:id UPDATES: ", req.body);
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books");
}));

//   post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}));
  
  module.exports = router;

