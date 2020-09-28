const Quiz = require("../models/quiz");
const QuestionBank = require("../models/questionBank");

const activeQuiz = async (req, res, next) => {
  try {
    if (req.session.quiz && req.session.questionBank) {
      const quiz = await Quiz.findById(req.session.quiz).exec();
      const questionBank = await QuestionBank.findById(
        req.session.questionBank
      ).exec();

      if (!quiz || !questionBank) return res.status(400).send("Invalid.");

      if (!quiz.active) return res.send("Quiz Inactive.");

      next();
    } else {
      return res.status(400).send("Restart Quiz.");
    }
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server Denied Request.");
  }
};

module.exports = activeQuiz;
