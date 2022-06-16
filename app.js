var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./lib/connectMongoose");

// console.log(process.env);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/apiv1/items", require("./routes/items"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  
  // if it's an api call render the error json 
  if (req.originalUrl.startsWith("/api")) {
    res.json({ error: err.message });
    return;
  }
  // if is a browser call render the error view
  res.render("error");
  
  //  else {
  //   res.render("error");
  // }

});

module.exports = app;
