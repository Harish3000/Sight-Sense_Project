//This file contains the schema for the user collection in the database
const mongoose = require("mongoose");

//declare schema
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

//create & export model based on schema
module.exports = mongoose.model("User", userSchema);
