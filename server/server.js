/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');
const textController = require('./controllers/controller');

const PORT = 3000;

app.use(cookieParser());

// in models with cookies
// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now },
// });
// res.cookie('userId', userId, {
//     maxAge: 360000,
// });
// to access cookies
// req.cookie.userId since we have the cookieParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// get, post, delete routes
app.get('/text',
  textController.getText,
  (req, res) => res.status(200).json(res.locals.data));

app.post('/text',
  textController.addText,
  (req, res) => res.status(200).json(res.locals.data));

app.delete('/text/:id',
  textController.deleteText,
  (req, res) => res.status(200).json(res.locals.data));

// Wrong URL error handler
app.use('*', (req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500);
});

// Listen on port 3000 
app.listen(PORT, () => console.log(`The App is listening at localhost:${PORT}`));
