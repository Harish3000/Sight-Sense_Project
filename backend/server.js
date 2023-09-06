require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const UserBase = require("./routes/User/User_base");

//express app
const app = express();





//middleware
app.use(express.json()); //to add json to the 'req' Object

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
UserBase(app);





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
