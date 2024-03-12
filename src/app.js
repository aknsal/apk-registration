const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require('path');
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieSession = require("cookie-session");
require("./auth/passport");
require("./auth/passportGoogleSSO");

require("./models/user");
require("./models/event");
require("./models/input");
require("./models/eventInputJunction");
require("./models/eventUserJunction");
require('./models/eventUpdate')

const middlewares = require("./middlewares");
const api = require("./api");
const passport = require("passport");

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname,'..', 'client', 'build')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(expressCspHeader({
//   directives: {
//       'default-src': [SELF],
//       'script-src': [SELF, INLINE],
//       'style-src': [SELF,INLINE],
//       'img-src': [SELF, 'https://lh3.googleusercontent.com'],
//       'worker-src': [NONE],
//       'block-all-mixed-content': false
//   }
// }));
app.use(morgan("dev"));
// app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/", api);



// app.get('*',function(req,res,next){
//   if(req.headers['x-forwarded-proto']!='https' )
//     res.redirect('https://register.aparoksha.in'+req.url)
//   else
//     next() /* Continue to other routes if we're not redirecting */
// })

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..','client', 'build', 'index.html'));
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
