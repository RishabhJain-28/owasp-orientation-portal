const express = require("express");

// * Models
const Question = require("../models/questions");
const Quiz = require("../models/quiz");

// * NPM Packages
const { omit } = require("lodash");
const CryptoJS = require("crypto-js");

// * Middleware

// * Utils
const validationSchemas = require("../validationSchemas/questions");

// * API Endpoints -->
const router = express.Router();

// * Create a new question
// * Done
router.post("/new", async (req, res) => {
  try {
    const { value, error } = validationSchemas.createQuestion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const quiz = await Quiz.findById(value.quiz).exec();
    if (!quiz) return res.status(400).send("Quiz does not exist.");

    const reqBody = omit(value, ["answer", "quiz"]);
    const answer = CryptoJS.Rabbit.encrypt(
      value.answer,
      process.env.CRYPTO_KEY
    ).toString();

    const newQuestion = await Question.create({
      ...reqBody,
      answer,
      quiz,
    });
    res.status(200).send(newQuestion);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Edit Question
// * Done
router.put("/edit/:id", async (req, res) => {
  try {
    const { value, error } = validationSchemas.editQuestion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const quiz = await Quiz.findById(value.quiz).exec();
    if (!quiz) return res.status(400).send("Quiz does not exist.");

    const editedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    ).exec();
    if (!editedQuestion)
      return res.status(400).send("Question does not exist.");

    res.status(200).send(editedQuestion);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * View question WITHOUT answer
// * Done
router.get("/view/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("quiz", "name")
      .select("-answer")
      .exec();
    if (!question) return res.status(400).send("Question does not exist.");

    res.status(200).send(question);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * View question WITH answer
// * Done
router.get("/view_master/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("quiz", "name")
      .exec();
    if (!question) return res.status(400).send("Question does not exist.");

    const answer = CryptoJS.Rabbit.decrypt(
      question.answer,
      process.env.CRYPTO_KEY
    ).toString(CryptoJS.enc.Utf8);

    res.status(200).json({ question, answer });
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Edit answer
// * Done
router.put("/changeAnswer/:id", async (req, res) => {
  try {
    const { value, error } = validationSchemas.changeAnswer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let question = await Question.findById(req.params.id).exec();
    if (!question) return res.status(400).send("Question not found.");

    const answer = CryptoJS.Rabbit.encrypt(
      value.answer,
      process.env.CRYPTO_KEY
    ).toString();

    question.answer = answer;
    await question.save();

    res.status(200).send("Successfully changed the answer.");
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Get all questions
// * Done
router.get("/all", async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate("quiz", "name")
      .select("-answer");
    if (!questions) return res.status(400).send("No Questions found.");

    res.status(200).send(questions);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * Get all questions for a Quiz
// * Done
router.get("/:quizId", async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.quizId })
      .populate("quiz", "name")
      .select("-answer");
    if (!questions) return res.status(400).send("No Questions found.");

    res.status(200).send(questions);
  } catch (error) {
    console.log("Error occured here -> \n", error);
    res.status(400).send("Server denied request.");
  }
});

// * End of API Endpoints -->

module.exports = router;
