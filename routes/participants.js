const express = require("express");

// * Models
const Participants = require("../models/participants");

// * Middleware
const isAuthenticated = require("../middleware/isAuthenticated");

// * Utils
const participantValidators = require("../validationSchemas/participants");

// * API Endpoints -->
const router = express.Router();

// * Registeration participant with google
// * Done
// router.post("/register", (req, res) => {
//   const { value, error } = participantValidators.register(req.body);
//   if (error) return res.redirect("/error");
//   global.userData = value;
//   res.redirect("/api/auth/login");
// });

// * Get profile of a participant
// * Done
router.get("/profile", isAuthenticated, async (req, res) => {
  res.send(req.user);
});

// * Get all participants
// ! CHECK FOR ADMIN
router.get("/all", async (req, res) => {
  const participants = await Participants.find();
  res.send(participants);
});

// * Edit logged in participant
// * Done
router.put("/edit", isAuthenticated, async (req, res) => {
  try {
    const { value, error } = participantValidators.edit(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const participant = await Participants.findByIdAndUpdate(
      req.user._id,
      value,
      { new: true }
    );
    if (!participant)
      return res.status(400).send("No participant with the given id found");
    res.send(participant);
  } catch (err) {
    res.status(400).send("Server denied request");
  }
});

// * Delete a participant
// ! CHECK IF ADMIN
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participants.findByIdAndDelete(id);
    if (!participant)
      return res.status(400).send("No participant with the given id found");
    res.send(participant);
  } catch (err) {
    res.status(400).send("Server denied request");
  }
});

module.exports = router;
