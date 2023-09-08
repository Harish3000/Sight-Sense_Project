require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserBase = require("./routes/User/User_base");
const AdvancedTest_base = require("./routes/AdvancedTest/AdvancedTest_base");
const GeneralTestBase = require("./routes/Generaltest/GeneralTest_base");

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //to add json to the 'req' Object
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyParser.json());
app.use(cors());

//routes
UserBase(app);
AdvancedTest_base(app);

GeneralTestBase(app);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & listening for requests on port ",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
