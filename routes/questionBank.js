const express = require("express");

// * NPM Packages
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const CryptoJS = require("crypto-js");
const { findIndex, shuffle } = require("lodash");

// * Middleware
const activeQuiz = require("../middleware/quiz");

// * Models
const QuestionBank = require("../models/questionBank");
const Question = require("../models/questions");
const Quiz = require("../models/quiz");
const Participant = require("../models/participants");
const isAuthenticated = require("../middleware/isAuthenticated");

// * API Endpoints -->
const router = express.Router();

// * Generate a question bank
router.post("/generate", async (req, res) => {
  try {
    console.log("gen");
    const schema = Joi.object({
      userId: Joi.string().trim().required(),
      quizId: Joi.string().trim().required(),
    });
    console.log(req.body);
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingQuiz = await Quiz.findById(value.quizId).exec();
    const existingUser = await Participant.findById(value.userId).exec();

    if (!existingQuiz || !existingUser) return res.send("Invalid value.");

    const existingQuestionBank = await QuestionBank.findOne({
      quiz: value.quizId,
      participant: value.userId,
    }).populate("questionIds", "-answer");
    if (existingQuestionBank) {
      return res.status(200).send(existingQuestionBank);
    }

    let questions = [];
    if (existingQuiz.haveSubs) {
      for (const sub of existingQuiz.subs) {
        console.log(sub);
        let x = await Question.find({
          quiz: value.quizId,
          sub: sub.name,
        }).exec();
        console.log("X ", x);
        x = x.map((i) => i._id);
        x = shuffle(x);
        x = x.slice(0, sub.number);
        console.log(x);
        questions = [...questions, ...x];
      }
    } else {
      let x = await Question.find({ quiz: value.quizId }).exec();
      x = x.map((i) => i._id);
      x = shuffle(x);
      x = x.slice(0, existingQuiz.noOfQuestions);
      console.log(x);
      questions = [...questions, ...x];
    }

    let questionBank = {};
    questions.forEach((id) => {
      questionBank[id] = { submittedAnswer: null, done: false };
    });

    const newQuestionBank = await QuestionBank.create({
      participant: value.userId,
      quiz: value.quizId,
      questions: questionBank,
      questionIds: questions,
    });

    const final = await QuestionBank.findById(newQuestionBank._id).populate(
      "questionIds",
      "-answer"
    );

    console.log("final", final);
    res.status(200).send(final);
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Submit an answer
// ! Scraped
router.post("/answer/:questionId", async (req, res) => {
  try {
    const schema = Joi.object({
      submittedAnswer: Joi.string().trim().required().max(250),
    });
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const questionBank = await QuestionBank.findById(
      req.session.questionBank
    ).exec();
    if (!questionBank) return res.status(400).send("Invalid Question Bank.");

    const question = await Question.findById(req.params.questionId).exec();
    if (!question) return res.status(400).send("Invalid Question.");

    const index = findIndex(questionBank.questions, {
      questionId: req.params.questionId,
    });
    if (index === -1) return res.status(400).send("Invalid Question.");

    const decryptedAnswer = CryptoJS.Rabbit.decrypt(
      question.answer,
      process.env.CRYPTO_KEY
    );

    if (value.submittedAnswer === decryptedAnswer.trim()) {
      if (!questionBank.questions[index].done) {
        questionBank.questions[index].done = true;
        questionBank.questions[index].submittedAnswer = value.submittedAnswer;
        questionBank.score = questionBank.score + question.points;
        questionBank = await questionBank.save();
      }
      return res
        .status(200)
        .json({ message: "Correct Answer", score: questionBank.score });
    } else {
      questionBank.questions[index].done = false;
      questionBank.questions[index].submittedAnswer = value.submittedAnswer;
      questionBank = await questionBank.save();

      return res
        .status(200)
        .json({ message: "Incorrect Answer", score: questionBank.score });
    }
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Submit the quiz
/*
req.body ==> {
  responses: {
    questionId: answer,
    questionId: answer,
    questionId: answer,
  }
}
*/
router.post("/submit", [isAuthenticated, activeQuiz], async (req, res) => {
  // console.log(r)
  try {
    let questionBank = await QuestionBank.findById(
      req.session.questionBank
    ).exec();
    if (!questionBank) return res.status(400).send("Invalid Question Bank.");
    if (questionBank.submitted)
      return res.status(400).send("Already submitted.");

    const schema = Joi.object({
      responses: Joi.object().pattern(Joi.objectId(), Joi.string().trim()),
    });

    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    for (let id of Object.keys(value.responses)) {
      let question = await Question.findById(id).exec();
      if (!question) continue;

      // let index = findIndex(questionBank.questions, (obj) => {
      //   return obj.questionId == item.question;
      // });
      // if (index === -1) {
      //   continue;
      // }

      let answer = CryptoJS.Rabbit.decrypt(
        question.answer,
        process.env.CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (!questionBank.questions.get(id)) {
        continue;
      }

      if (answer.trim() === value.responses[id]) {
        if (questionBank.questions.get(id).done === true) {
          continue;
        } else {
          questionBank.questions.set(id, {
            submittedAnswer: value.responses[id],
            done: true,
          });
          questionBank.score = questionBank.score + question.points;
        }
      } else {
        questionBank.questions.set(id, {
          submittedAnswer: value.responses[id],
          done: false,
        });
      }
    }
    questionBank.submitted = true;
    questionBank = await questionBank.save();

    res
      .status(200)
      .json({ msg: "Quiz Response submitted.", score: questionBank.score });
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * End of API Endpoints -->
module.exports = router;
