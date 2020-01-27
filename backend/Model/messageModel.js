const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Message = new Schema({
  fromEmail: {
    type: String
  },
  toEmail: {
    type: String
  },
  fromName: {
    type: String
  },
  toName: {
    type: String
  },
  message: {
    type: String
  },
  read: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", Message);
