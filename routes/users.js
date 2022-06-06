var express = require("express");
var router = express.Router();
var path = require("path");
var User=require('../models/userdb')

/* GET users listing. */
router.get("/user/create", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/add_user.html"));
});

router.post("/users", (req, res, next) => {
  console.log(req.body);
  res.send("success");
});

router.get("/users", (req, res, next) => {
  User.fetchAll().then((users) => {
    res.json(users);
  })
});

router.get("/users/:id", async(req, res, next) => {
    id=req.params.id
    // console.log(typeof(id))
    let user = await User.where({'id':parseInt(id)}).fetch({require:true})
    res.json(user)
}
);


router.get("/users/edit/:id/:firstname/:secondname/:email/:password", (req,res,next)=>{
  id=Number(req.params.id)
  firstname=req.params.firstname
  secondname=req.params.secondname
  email=req.params.email
  password=req.params.password
  User.where({"id":id}).save({"firstname":firstname,"secondname":secondname,"email":email,"password":password},{patch:true})
  res.send("Updated User")
})

router.delete("/users/delete/:id"), (req,res,next)=>{
  id=Number(req.params.id)
  User.where({"id":id}).destroy()
  res.send("Deleted User")
}


module.exports = router;
