const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 100,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
    },
  ],
});

const Pool = mongoose.model("Pool", poolSchema);

module.exports = Pool;
