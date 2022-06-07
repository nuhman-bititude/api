var express = require("express");
var router = express.Router();
var path = require("path");
var User = require("../models/userdb");

router.get("/user/create", function (req, res, next) {
  // Create user, sendFile (HTML)
  res.sendFile(path.resolve(__dirname, "../public/add_user.html"));
});

router.post("/users", async (req, res, next) => {
  // POST METHOD FOR INSERTION OF USER INTO DB
  firstname = req.body.firstName;
  secondname = req.body.secondName;
  email = req.body.email;
  password = req.body.password;
  try {
    var users = await User.forge({
      firstname: firstname,
      secondname: secondname,
      email: email,
      password: password,
    }).save();
  } catch (err) {
    console.error(err);
    res.send(err);
  }

  res.send(
    "success <br>  <a href='http://localhost:3000/users/'>Click here to see all users</>"
  );
});

router.get("/users", (req, res, next) => {
  // GET ALL USERS FROM DB
  User.fetchAll().then((users) => {
    res.json(users);
  });
});

router.get("/users/:id", async (req, res, next) => {
  // GET SPECIFIC USER WITH ID
  id = req.params.id;
  // console.log(typeof(id))
  let user = await User.where({ id: parseInt(id) }).fetch({ require: true });
  res.json(user);
});

router.get("/users/edit/:id", async (req, res, next) => {
  // render page for editing
  id = req.params.id;
  try {
    let user = await User.where({ id: parseInt(id) }).fetch({ require: true });
    // console.log(user.attributes.firstname)
    firstname = user.attributes.firstname;
    secondname = user.attributes.secondname;
    email = user.attributes.email;
    password = user.attributes.password;
    res.render("edit", {
      firstname: firstname,
      secondname: secondname,
      email: email,
      password: password,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get(
  // USER UPDATE WITH SPECIFC ID
  "/users/edit/:id/:firstname/:secondname/:email/:password",
  (req, res, next) => {
    id = Number(req.params.id);
    firstname = req.params.firstname;
    secondname = req.params.secondname;
    email = req.params.email;
    password = req.params.password;
    User.where({ id: id }).save(
      {
        firstname: firstname,
        secondname: secondname,
        email: email,
        password: password,
      },
      { patch: true }
    );
    res.send("Updated User");
  }
);

router.get("/users/delete/:id"), // USER DELETE WITH SPECIFIC ID
  async (req, res, next) => {
    id = Number(req.params.id);
    console.log(id);
    let user = await User.where({ id: id }).destroy();
    res.send(user);
  };

module.exports = router;
