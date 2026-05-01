const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const commentsRouter = require('./routes/comments');
const { dbMiddleware } = require('./bin/db');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(dbMiddleware);

app.use('/', indexRouter);
app.use('/', commentsRouter);

app.use(function (req, res) {
  res.status(404).render('error', {
    title: 'Error | Downtown Donuts',
    message: 'Page not found'
  });
});

module.exports = app;

