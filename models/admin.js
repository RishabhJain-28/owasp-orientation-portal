const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
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
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  permission: {
    type: String,
    enum: ["participant", "admin"],
    default: "admin",
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
