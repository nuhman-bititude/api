var express = require("express");
var router = express.Router();
var userController = require("../userController/controller");
var { body } = require("express-validator");

router.get("/user/create", userController.createUserForm);

router.post(
  "/users",
  body("firstname").isLength({ min: 3 }),
  body("secondname").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.createUser
);

router.get("/users", userController.fetchAll);

router.get("/users/:id", userController.fetchOne);

router.get("/users/edit/:id", userController.viewEdit);

router.patch(
  "/users/edit/:id",
  body("firstname").isLength({ min: 3 }),
  body("secondname").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.editUser
);

router.delete("/users/delete/:id", userController.deleteUser);

module.exports = router;
