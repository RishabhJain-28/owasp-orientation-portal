const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    // minlength: 5,
    maxlength: 250,
    required: true,
  },
  username: {
    type: String,
    // minlength: 5,
    maxlength: 250,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNo: {
    type: Number,
    // unique: true,
  },
  rollNo: {
    type: Number,
    // unique: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  branch: {
    //! DROPDOWN
    type: String,
    // required: true,
    // minLength: 5,
    maxlength: 250,
  },
  profilePicLink: {
    type: String,
    required: true,
  },
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
