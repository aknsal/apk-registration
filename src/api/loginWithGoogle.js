const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

const successLoginUrl = "https://register.aparoksha.in/login/success";
const errorLoginUrl = "https://register.aparoksha.in/login/error";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in!");
  }
);

module.exports = router;
