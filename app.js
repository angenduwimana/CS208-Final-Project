const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const { dbMiddleware } = require('./bin/db');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(dbMiddleware);

app.use('/', indexRouter);

app.use(function (req, res) {
  res.status(404).render('error', { message: 'Page not found', error: {} });
});

module.exports = app;

