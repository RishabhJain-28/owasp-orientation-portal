const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 150,
    required: true,
  },
  description: {
    type: String,
    maxlength: 250,
  },
  scheduledOn: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
