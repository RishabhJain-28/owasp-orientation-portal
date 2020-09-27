const express = require("express");

// * Models
const Admin = require("../models/admin");

// * NPM Packages
const { omit } = require("lodash");
const bcrypt = require("bcryptjs");

// * Middleware
const admin = require("../middleware/admin");

// * Utils
const validationSchemas = require("../validationSchemas/admin");

// * API Endpoints
const router = express.Router();

// * Create Admin
router.post("/new", admin, async (req, res) => {
  try {
    const { value, error } = validationSchemas.createAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const reqBody = omit(value, ["phoneNo", "password", "confirmPassword"]);
    if (value.password === value.confirmPassword)
      return res.status(400).send("Passwords do not match.");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(value.password, salt);

    const newAdmin = await Admin.create({
      ...reqBody,
      phoneNo: Number(value.phoneNo),
      password: password,
    });

    res.status(200).send(newAdmin);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Edit Admin
router.put("/edit", admin, async (req, res) => {
  try {
    const { value, error } = validationSchemas.editAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const reqBody = omit(value, ["phoneNo"]);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user._id,
      {
        ...reqBody,
        phoneNo: Number(value.phoneNo),
      },
      { new: true }
    ).exec();
    if (!updatedAdmin) return res.status(400).send("User does not exist. ");

    res.status(200).send(updatedAdmin);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Change Password
router.put("/changePassword", admin, async (req, res) => {
  try {
    const { value, error } = validationSchemas.changePassword(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findById(req.user._id).exec();
    if (!admin) return res.status(400).send("User does not exist.");

    if (value.password === value.confirmPassword)
      return res.status(400).send("Passwords do not match.");

    const previousPasswordMatch = await bcrypt.compare(
      value.oldPassword,
      admin.password
    );
    if (!previousPasswordMatch)
      return res.send("Previous password does not match.");

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(value.password, salt);

    admin.password = newPassword;
    admin = await admin.save();

    res.status(200).send(admin);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Toggle access of admin
router.put("/active/:adminId", admin, async (req, res) => {
  try {
    const { value, error } = validationSchemas.changeAccess(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.adminId,
      { active: value.access },
      { new: true }
    ).exec();
    if (!updatedAdmin) return res.status(400).send("User does not exist.");

    res.status(200).send(updatedAdmin);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * End of API Endpoints

module.exports = router;
