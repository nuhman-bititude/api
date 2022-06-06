var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<a href='http://localhost:3000/user/create'>Create a New User</a>")
});

module.exports = router;
