const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const expanceRoute = require('./routes/expance.route')
const db = require('./config/db')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
app.use(cors());
app.use(db());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', expanceRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(4500, () => {
  console.log("Expance app is running on 4500");
});

module.exports = app;