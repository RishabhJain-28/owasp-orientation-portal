//!ADD VALIDATION

// * NPM Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
const connectFlash = require("connect-flash");
const path = require("path");

const app = express();

// * Routes import
const auth = require("./routes/auth");
const participants = require("./routes/participants");

// * Middleware
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, //24 HOURS
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(connectFlash());

// * Passport Setup
require("./config/passportParticipants");
app.use(passport.initialize());
app.use(passport.session());

// * Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on ${PORT}`));

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("Connection to DB failed \n", err);
    return console.log("Connected to DB.");
  }
);

// * Routes setup
app.use("/api/auth", auth);
app.use("/api/participants", participants);

app.use(express.static(path.resolve(__dirname, "Client", "build")));

app.get("/*", (req, res) => {
  // res.sendFile("index.html");
  res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
});
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
