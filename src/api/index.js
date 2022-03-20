const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");
const eventApi = require("./event");
const inputApi = require("./input");
const registerForEvent = require("./registerForEvent");
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(loginWithGoogleApi);
router.use(userApi);
router.use(eventApi);
router.use(inputApi);
router.use(registerForEvent);

module.exports = router;
