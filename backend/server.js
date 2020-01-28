const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = express.Router();
const MessageRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/myDB", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

//---------------------------------message Start-----------------------------------------
let Message = require("./Model/messageModel");

MessageRoutes.route("/add").post(function(req, res) {
  let message = new Message(req.body);

  message
    .save()
    .then(message => {
      res.status(200).json({ message: "message added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new message failed");
    });
});

//Find
MessageRoutes.route("/findMessageByEmail/:fromEmail/:toEmail").get(function(
  req,
  res
) {
  let { fromEmail, toEmail } = req.params;
  let allMessage = [];
  Message.find({ ["fromEmail"]: fromEmail, ["toEmail"]: toEmail }, function(
    err,
    messages
  ) {
    messages.forEach(element => {
      allMessage.push(element);
    });
    Message.find({ ["fromEmail"]: toEmail, ["toEmail"]: fromEmail }, function(
      err,
      messages
    ) {
      messages.forEach(element => {
        allMessage.push(element);
      });
      res.json(allMessage);
    });
  });
});

//FindPublicMessages
MessageRoutes.route("/findPublicMessage").get(function(req, res) {
  Message.find({ ["toEmail"]: "PublicRoom" }, function(err, messages) {
    res.json(messages);
  });
});

app.use("/message", MessageRoutes);

//---------------------------------message End-----------------------------------------

//---------------------------------user Start-----------------------------------------

let User = require("./Model/userModel");

//Login
UserRoutes.route("/Login/:email/:password").get(function(req, res) {
  let { email, password } = req.params;
  User.findOne({ ["email"]: email, ["password"]: password }, function(
    err,
    users
  ) {
    res.json(users);
  });
});

//Add
UserRoutes.route("/add").post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "user added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new user failed");
    });
});

//Add a friend by updating user's info with locoalhost:3000/addFriend/{email}
UserRoutes.route("/addFriend/:email").post(function(req, res) {
  let email = req.params.email;
  User.findOne({ ["email"]: email }, function(err, users) {
    if (!users) res.status(404).send("data is not found");
    else users.friend.push(req.body);

    users
      .save()
      .then(users => {
        res.json("Add a friend!");
      })
      .catch(err => {
        res.status(400).send("Something wrong!");
      });
  });
});

//Find by ID with locoalhost:3000/{id}
UserRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, users) {
    res.json(users);
  });
});

//Find by Email with locoalhost:3000/findByEmail/{email}
UserRoutes.route("/findByEmail/:email").get(function(req, res) {
  let email = req.params.email;
  User.findOne({ ["email"]: email }, function(err, users) {
    res.json(users);
  });
});

//Update by Email with locoalhost:3000/update/{email}
UserRoutes.route("/loginState/:email").post(function(req, res) {
  let email = req.params.email;
  User.findOne({ ["email"]: email }, function(err, users) {
    if (!users) res.status(404).send("data is not found");
    else users.online = req.body.online;

    users
      .save()
      .then(users => {
        res.json("User updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

//Update by Email with locoalhost:3000/update/{email}
UserRoutes.route("/update/:email").post(function(req, res) {
  let email = req.params.email;
  User.findOne({ ["email"]: email }, function(err, users) {
    if (!users) res.status(404).send("data is not found");
    else users.online = req.body.online;
    users.email = req.body.email;
    if (!!req.body.password) users.password = req.body.password;
    users.name = req.body.name;
    users.gender = req.body.gender;
    // users.birth = req.body.birth;
    users.prefixSelector = req.body.prefixSelector;
    users.phoneNumber = req.body.phoneNumber;
    // users.friend = req.body.friend;

    users
      .save()
      .then(users => {
        res.json("User updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

app.use("/users", UserRoutes);

//---------------------------------user End-----------------------------------------

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
