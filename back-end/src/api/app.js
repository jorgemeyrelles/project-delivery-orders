const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { AppError } = require('../errors/AppError');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/images/:id',
  express.static(path.join(__dirname, '..', '..', 'public', 'images')));

app.use(routes);

const uploadPath = resolve(__dirname, '..', 'images');
app.use('/images', express.static(`${uploadPath}`));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use((err, _req, res, _next) => {
  if (err instanceof AppError) {
    const { message, httpStatusCode } = err;
    console.log(message);
    return res.status(httpStatusCode).json({ message });
  }
  return res.status(500).json({ message: `Internal server error - ${err.message}` });
});

module.exports = app;
