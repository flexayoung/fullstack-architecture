const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
const bodyParser = require('body-parser');
mongoose.connect(keys.mongoURI);

require('./models/User');
require('./services/passport');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/authRoutes'));
app.use(require('./routes/billingRoutes'));

app.listen(PORT);
