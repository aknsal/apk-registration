const passport = require("passport");
const Event = require("../models/event");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

const novu = require("../notifications/notification")

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log("Debug");
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };

      const [user, created] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });

      console.log("User created or found", toString(user.id));

      await novu.subscribers.identify(user.id.toString(), {
        email: profile.emails[0].value, // optional
        firstName: profile.name.givenName, // optional
        lastName: profile.name.familyName, // optional
        // phone: '', // optional
        avatar: profile.photos[0].value, // optional
        // locale: '', // optional
        // data: { customKey1: 'customVal1', customKey2: 'customVal2' }, // optional
      }).catch((err) => {console.log("Error subscribing user!", err.response.data)} );

      console.log("Subscriber added", user.id);


      if (user) return cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user.email);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id }, include:Event }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user.email);

  if (user) cb(null, user);
});
