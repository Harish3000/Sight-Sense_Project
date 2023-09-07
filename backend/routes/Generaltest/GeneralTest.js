const router = require("express").Router();
let Test = require("../../models/GeneralTest_Modal");
const { route } = require("../User/User");

//Add test
router.route("/add").post((req, res) => {
  const test_name = "General Test";
  const user_id = Math.random();
  const test_date = new Date();
  const test_score = req.body.test_score;

  const newTest = new Test({
    test_name,
    user_id,
    test_date,
    test_score,
  });

  newTest
    .save()
    .then(() => {
      res.json("Test added!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
