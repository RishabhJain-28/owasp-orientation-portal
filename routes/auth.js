const express = require("express");

// * NPM Packages
const passport = require("passport");

// * API Endpoints -->
const router = express.Router();

// * Middleware
const isAuthenticated = require("../middleware/isAuthenticated");

// * Initiate login request
// * Done

router.get(
  "/login",
  (req, res, next) => {
    req.session.route = "login";
    return next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post(
  "/register",
  (req, res, next) => {
    req.session.body = req.body;
    req.session.route = "register";

    return next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// * Callback uri for google login
// * Done
router.get(
  "/login/callback",
  passport.authenticate("google", {
    // failureFlash: "YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
    // failureRedrect: `${process.env.CLIENT_URL}`,
  }),
  (req, res) => {
    res.redirect(`/dashboard`);
  }
);

// * Logout
// * Done
router.get("/logout", isAuthenticated, (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// * End of API Endpoints -->

module.exports = router;
