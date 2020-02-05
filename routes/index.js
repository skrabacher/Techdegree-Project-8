var express = require('express');
var router = express.Router();


//   get / - Home route should redirect to the /books route.
router.get('/', (req, res) => {
  res.redirect("/books");
});

module.exports = router;
