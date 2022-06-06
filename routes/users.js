var express = require("express");
var router = express.Router();
var path = require("path");
var User=require('../models/get_users')

/* GET users listing. */
router.get("/user/create", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/add_user.html"));
});

router.post("/users", (req, res, next) => {
  console.log(req.body);
  res.send("success");
});

router.patch("/", (req, res, next) => {});

module.exports = router;
