const express = require("express");

// * NPM Packages
const { omit, pick } = require("lodash");
const axios = require("axios").default;

// * Models
const Quiz = require("../models/quiz");
const Participants = require("../models/participants");
const QuestionBank = require("../models/questionBank");

// * Middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const activeQuiz = require("../middleware/quiz");

// * Utils
const validation = require("../validationSchemas/quiz");

// * API Endpoints -->
const router = express.Router();

// * Create a new Quiz ( Admin )
router.post("/new", async (req, res) => {
  try {
    const { value, error } = validation.createQuiz(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // const reqBody = omit(value, ["scheduledOn"]);
    const reqBody = value;
    const newQuiz = await Quiz.create({
      ...reqBody,
      // scheduledOn: new Date(value.scheduledOn),
    });

    res.status(200).send(newQuiz);
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server Denied Request.");
  }
});

// * Edit Quiz Details ( Admin )
router.put("/edit/:id", async (req, res) => {
  try {
    const { value, error } = validation.editQuiz(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // const reqBody = omit(value, ["scheduledOn"]);
    const reqBody = value;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        ...reqBody,
        // scheduledOn: new Date(value.scheduledOn),
      },
      { new: true }
    ).exec();

    if (!quiz) return res.status(400).send("Quiz does not exist.");

    res.status(200).send(quiz);
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server Denied Request.");
  }
});

// * Get all quizes
router.get("/all", isAuthenticated, async (req, res) => {
  try {
    const quizes = await Quiz.find({ completed: false }).exec();

    res.send(quizes);
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server Denied Request.");
  }
});

// * Start quiz ( Participants )
router.get("/start/:id", async (req, res) => {
  console.log(req.user._id);
  try {
    let quiz = await Quiz.findById(req.params.id).exec();
    if (!quiz || !quiz.active || quiz.completed)
      return res.status(400).send("Can not start quiz.");

    const { data, status } = await axios.post(
      // `http://localhost:5000/api/questionBank/generate`,

      `${process.env.CLIENT_URL}/api/questionBank/generate`,
      // `/api/questionBank/generate`,
      {
        userId: req.user._id,
        // userId: req.user.,
        quizId: req.params.id,
      }
    );
    console.log(data);
    if (status !== 200) return res.send("Error occured.");
    req.session.quiz = quiz._id;
    req.session.questionBank = data._id;

    // res.status(200).send("Quiz Started.");
    res.status(200).send(data);
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server Denied Request.");
  }
});

// * End Quiz ( Admin )
router.get("/end/:id", async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id).exec();
    if (!quiz || !quiz.active || quiz.completed)
      return res.status(400).send("Can not end quiz.");

    await QuestionBank.updateMany({ quiz: quiz._id }, { submitted: true });

    quiz.active = false;
    quiz.completed = true;
    quiz = await quiz.save();

    res.status(200).send("Quiz Ended.");
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Server Denied Request.");
  }
});

router.get("/leaderboard", async (req, res) => {
  req.user = { id: "5f7327acce94c8001732dd00" };
  const quiz = await Quiz.find({ name: "funquiz" });
  console.log(quiz[0]._id);
  const questionBanks = await QuestionBank.find({ quiz: quiz[0]._id });
  let leaderboard = questionBanks
    .sort((a, b) => a.score > b.score)
    .splice(10)
    .map((lb) => pick(lb, ["_id", "score", "participant"]));
  // console.log(leaderboard);
  const self = await QuestionBank.find({ participant: req.user.id });
  // console.log(self);
  // const participants= await Participants.find({})
  const abc = [];
  leaderboard = leaderboard.map(async (lb) => {
    // const user = await Participants.findById(lb.participant);
    // Participants.findById(lb.participant).then((user) => {
    //   const z = { leaderboard: lb, user: { id: user._id, name: user.name } };
    //   abc.push(z);
    // });
  });
  console.log(abc);
  const result = {
    self: pick(self, ["_id", "score"]),
    leaderboard,
  };
  console.log(result);
  // console.log(result);
  res.json(result);
});

// * End of API Endpoints -->
module.exports = router;
