// * NPM Packages
const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const Joi = require("joi");

// * Models
const Participant = require("../models/participants");

// * Settingup Passport google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // callbackURL: "/api/auth/login/callback",
      callbackURL: "http://localhost:3000/api/auth/login/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let participant = await Participant.findOne({ email: profile.email });

      if (!participant) {
        //!

        if (req.session.route === "login")
          return done(null, false, "NOT REGISTERED");

        const schema = Joi.object({
          branch: Joi.string().min(1).max(150).required().trim(),
          username: Joi.string().min(1).max(150).required().trim(),
          rollNo: Joi.string().trim().required(),
          phoneNo: Joi.string().trim().required(),
        });

        const { body } = req.session;
        const { value, error } = schema.validate(body);
        if (error) return done(null, false, "INVALID INPUT");

        participant = new Participant({
          name: profile.displayName,
          email: profile.email,
          googleId: profile.id,
          profilePicLink: profile.picture,
          phoneNo: Number(value.phoneNumber),
          rollNo: Number(value.rollNumber),
          branch: value.branch,
          username: value.username,
        });

        await participant.save();
      }
      done(null, participant);
    }
  )
);

// * Passport serializeUser
passport.serializeUser((participant, done) => {
  done(null, participant.id);
});

// * Passport deserializeUser
passport.deserializeUser(async (id, done) => {
  const participant = await Participant.findById(id);
  done(null, participant);
});
