const { body, validationResult } = require("express-validator");
var path = require("path");
var User = require("../models/userdb");

exports.createUserForm = (req, res, next) => {
  // Create user, sendFile (HTML)
  res.sendFile(path.resolve(__dirname, "../public/add_user.html"));
};

exports.createUser = async (req, res, next) => {
  // POST METHOD FOR INSERTION OF USER INTO DB
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var users = await User.forge({
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      email: req.body.email,
      password: req.body.password,
    }).save();
  } catch (error) {
    console.error(error);
    if ((error.eerno = 1062)) {
      res.send("User email Already exist");
    } else {
      res.send(error);
    }
  }

  res.send(
    "success <br>  <a href='http://localhost:3000/users/'>Click here to see all users</>"
  );
};

exports.fetchAll = (req, res, next) => {
  // GET ALL USERS FROM DB
  try {
    User.fetchAll().then((users) => {
      res.json(users);
    });
  } catch (error) {
    res.send(error);
  }
};

exports.fetchOne = async (req, res, next) => {
  // GET SPECIFIC USER WITH ID
  try {
    id = req.params.id;
    // console.log(typeof(id))
    let user = await User.where({ id: parseInt(id) }).fetch({ require: true });
    res.json(user);
  } catch (error) {
    if (error.message == "EmptyResponse") {
      res.send("No User Found");
    } else {
      res.send(error);
    }
  }
};

exports.viewEdit = async (req, res, next) => {
  // render page for editing
  id = req.params.id;
  try {
    let user = await User.where({ id: parseInt(id) }).fetch({ require: true });
    // console.log(user.attributes.firstname)
    res.render("edit", {
      firstname: user.attributes.firstname,
      secondname: user.attributes.secondname,
      email: user.attributes.email,
      password: user.attributes.password,
    });
  } catch (error) {
    if (error.message == "EmptyResponse") {
      res.send("No User Found");
    } else {
      res.send(error);
    }
  }
};

exports.editUser = (req, res, next) => {
  // USER UPDATE WITH SPECIFC ID
  const errors = validationResult(req);
  id = Number(req.params.id);
  console.log(password);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.where({ id: id }).save(
      {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        email: req.body.email,
        password: req.body.password,
      },
      { patch: true }
    );
    res.send("Updated User");
  } catch (error) {
    if (error.message == "EmptyResponse") {
      res.send("No User Found");
    } else {
      res.send(error);
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  // USER DELETE WITH SPECIFIC ID
  id = Number(req.params.id);
  // console.log(id);
  try {
    let user = await User.where({ id: id }).destroy();
    res.send("Deleted User");
  } catch (error) {
    if (error.message == "EmptyResponse") {
      res.send("No User Found");
    } else {
      res.send(error);
    }
  }
};
