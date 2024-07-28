const express = require("express");
const upload = require("../middleware/multer");
const {
  createRegistration,
  getAllRegistration,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/RegistrationController");
const route = express.Router();
route.post("/registration/create", upload.single("image"), createRegistration);
route.get("/registration/list", getAllRegistration);
route.put("/registration/edit/:id", updateRegistration);
route.delete("/registration/delete/:id", deleteRegistration);

module.exports = route;
