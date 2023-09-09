const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClinicsSchema = new Schema({
  clinicName: {
    type: String,
    requred: true, //validating title field
  },
  clinicLocation: {
    type: String,
    requred: true, //validating content field
  },
  clinicContact: {
    type: String,
    requred: true, //validating content field
  },
  clinicWebsite: {
    type: String,
    requred: true, //validating content field
  },
});

const Clinics = mongoose.model("NewClinic", ClinicsSchema);
module.exports = Clinics;
