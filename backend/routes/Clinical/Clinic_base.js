const clinicRoutes = require("./Clinic");

module.exports = (app) => {
  app.use("/api/Clinics", clinicRoutes);
};
