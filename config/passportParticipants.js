// * NPM Packages
const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;

// * Models
const Participant = require("../models/participants");

// * Settingup Passport google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/login/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let participant = await Participant.findOne({ email: profile.email });

      if (!participant) {
        //!

        if (req.session.route === "login")
          return done(null, false, "NOT REGISTERED");

        const { body } = req.session;
        participant = new Participant({
          name: profile.displayName,
          email: profile.email,
          googleId: profile.id,
          profilePicLink: profile.picture,
          phoneNo: Number(body.phoneNumber),
          rollNo: Number(body.rollNumber),
          branch: body.branch,
          username: body.username,
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
