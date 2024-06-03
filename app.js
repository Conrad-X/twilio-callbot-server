var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
var callerRouter = require('./routes/caller.route')
var cors = require('cors');
const { database } = require('./configs/database.config');
const { User } = require('./models');
const { transporter, getMailConfigurations } = require('./configs/nodemailer.config');
const { authMiddleware } = require('./middleware/auth.middleware');

var app = express();

app.use(cors());

// for enviroment variables
require("dotenv").config();

// connect database
database.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

database.sync();
// const token = jwt.sign({ userId: "12-312-312-123" }, process.env.JWT_SECRET_KEY)
// // sending email
// transporter.sendMail(getMailConfigurations("tayyab19jr@gmail.com", token), (err, info) => {
//   if (err) console.error(err)
//   else console.log("Email Sent: ", info);
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
// app.use(authMiddleware)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/caller', authMiddleware, callerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
