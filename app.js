const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const uploadsRouter = require("./routes/uploads");
const downloadsRouter = require("./routes/download");
const deleteRouter = require("./routes/delete");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("public", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(indexRouter);
app.use(uploadsRouter);
app.use(downloadsRouter);
app.use(deleteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;