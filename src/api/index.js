const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");
const eventApi = require("./event");
const inputApi = require("./input");
const registerForEvent = require("./registerForEvent");
const notificationApi = require("./notification")
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(loginWithGoogleApi);
router.use(userApi);
router.use(eventApi);
router.use(inputApi);
router.use(registerForEvent);
router.use(notificationApi)

module.exports = router;
