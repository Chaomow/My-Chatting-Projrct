const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  online: {
    type: Boolean
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  gender: {
    type: String
  },
  // birth: {
  //   type: Object
  // },
  prefixSelector: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  friend: {
    type: Array
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", User);
