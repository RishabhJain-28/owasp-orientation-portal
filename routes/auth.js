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

  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedrect: `${process.env.CLIENT_URL}/`,
  })
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
router.get("/login/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"],
    },
    function (err, user, info) {
      // console.log(err, user, info);
      if (!user)
        return res.redirect(
          `https://owasp-orientation.herokuapp.com/error?msg=${err}`
        );
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect(
          `https://owasp-orientation.herokuapp.com/dashboard`
        );
      });
    }
  )(req, res, next);
});

// * Logout
// * Done
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// * End of API Endpoints -->

module.exports = router;
