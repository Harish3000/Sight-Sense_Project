const express = require("express");
const Clinics = require("../../models/ClinicsModel");
const router = express.Router();

// create ~ http://localhost:4000/api/Clinics/newClinic
router.route("/newClinic").post((req, res) => {
  const clinicName = req.body.clinicName;
  const clinicLocation = req.body.clinicLocation;
  const clinicContact = req.body.clinicContact;
  const clinicWebsite = req.body.clinicWebsite;

  const newClinic = new Clinics({
    clinicName,
    clinicLocation,
    clinicContact,
    clinicWebsite,
  });

  newClinic
    .save()
    .then(() => {
      res.json("Clinic Created!!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error creating Clinic" });
    });
});

// read ~ http://localhost:4000/api/Clinics/clinics
router.route("/clinics").get((req, res) => {
  // fetch all Clinics
  Clinics.find()
    .then((clinicData) => {
      res.json(clinicData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching Clinics" });
    });
});

// update ~ http://localhost:4000/api/Clinics/edit/id
router.route("/edit/:clinicId").put(async (req, res) => {
  let ClinicID = req.params.clinicId; // Use req.params to get the ID from the URL

  const { clinicName, clinicLocation, clinicContact, clinicWebsite } = req.body;

  const editClinic = {
    clinicName,
    clinicLocation,
    clinicContact,
    clinicWebsite,
  };

  //checking for an existing record
  try {
    const updatedClinic = await Clinics.findByIdAndUpdate(
      ClinicID,
      editClinic,
      {
        new: true, // This ensures that the updated document is returned
      }
    );
    if (updatedClinic) {
      res
        .status(200)
        .json({ status: "Clinic Edited!!", Clinic: updatedClinic });
    } else {
      res.status(404).json({ error: "Clinic not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error in editing Clinics!!", error: err.message });
  }
});

//delete ~ http://localhost:4000/api/Clinics/delete/id
router.route("/delete/:clinicId").delete(async (req, res) => {
  let ClinicID = req.params.clinicId;
  await Clinics.findByIdAndDelete(ClinicID)
    .then(() => {
      res.status(200).send({ status: "Clinic Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting Clinic", error: err.message });
    });
});

module.exports = router;
