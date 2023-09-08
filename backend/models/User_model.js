//This file contains the schema for the user collection in the database
const mongoose = require("mongoose");

//declare schema
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  addLine1: {
    type: String,
    required: true,
  },
  addLine2: {
    type: String,
    required: true,
  },
  addLine3: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create & export model based on schema
module.exports = mongoose.model("User", userSchema);
