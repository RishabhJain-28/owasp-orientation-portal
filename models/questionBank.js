const mongoose = require("mongoose");

const obj = new mongoose.Schema({
  submittedAnswer: {
    type: String,
    default: null,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const questionBankSchema = new mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant",
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  questions: {
    type: Map,
    of: obj,
  },
  questionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  }],
  score: {
    type: Number,
    default: 0,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

questionBankSchema.index(
  {
    quiz: 1,
    participant: 1,
  },
  { unique: true }
);

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);

module.exports = QuestionBank;
