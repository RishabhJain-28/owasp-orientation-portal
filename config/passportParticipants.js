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
      callbackURL: "/api/auth/login/callback",
      // callbackURL: "http://localhost:3000/api/auth/login/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let participant = await Participant.findOne({ email: profile.email });

      if (!participant) {
        if (req.session.route === "login")
          return done(
            "This google id is not registered",
            false,
            "NOT REGISTERED"
          );
        const branches = [
          "CHEMICAL ENGINEERING – CHE",
          "CIVIL ENGINEERING - CIE",
          "COMPUTER ENGINEERING - COE",
          "COMPUTER SCIENCE AND ENGINEERING(PATIALA CAMPUS) – COPC",
          "ELECTRICAL ENGINEERING - ELE",
          "ELECTRONICS AND COMMUNICATION ENGINEERING - ECE",
          "ELECTRONICS AND COMPUTER ENGINEERING - ENC",
          "ELECTRONICS (INSTRUMENTATION AND CONTROL) ENGINEERING - EIC",
          "MECHANICAL ENGINEERING – MEE",
          "MECHANICAL ENGINEERING(PRODUCTION) - MPE",
          "MECHATRONICS - MEC",
          "ELECTRICAL AND COMPUTER ENGINEERING - MEC",
        ];
        const schema = Joi.object({
          name: Joi.string().trim().required().max(150),
          branch: Joi.string()
            .valid(...branches)
            .min(1)
            .max(150)
            .required()
            .trim(),
          year: Joi.string()
            .valid("First year", "Second year")
            .min(1)
            .max(150)
            .required()
            .trim(),
          rollNumber: Joi.string().trim().required(),
          phoneNumber: Joi.string().trim().required(),
        });

        const { body } = req.session;
        const { value, error } = schema.validate(body);

        if (error)
          return done(
            "INVALID DETAILS... FILL THE FORM PROPERLY",
            false,
            "INVALID INPUT"
          );

        participant = new Participant({
          name: value.name,
          email: profile.email,
          googleId: profile.id,
          profilePicLink: profile.picture,
          phoneNo: Number(value.phoneNumber),
          rollNo: Number(value.rollNumber),
          branch: value.branch,
          year: value.year,
          // username: value.username,
        });

        await participant.save();
      }
      done(null, participant);
    }
  )
);

// * Passport serializeUser
passport.serializeUser((participant, done) => {
  console.log(participant);
  done(null, participant.id);
});

// * Passport deserializeUser
passport.deserializeUser(async (id, done) => {
  const participant = await Participant.findById(id);
  done(null, participant);
});
