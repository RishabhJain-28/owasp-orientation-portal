const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true,
  },
  statement: {
    type: String,
    minlength: 5,
    maxlength: 1500,
    required: true,
  },
  attachments: [
    {
      type: String,
    },
  ],
  type: {
    type: String,
    enum: ["MCQ", "INPUT"],
    required: true,
  },
  options: {
    type: Array,
    default: [],
    min: 4,
    max: 4,
  },
  answer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    min: 0,
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  sub: {
    type: String,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
