const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.db = db;
  next();
});

const routes = require('./routes/api/routes')(app);

db.connect('mongodb://localhost:27017/api', (error) => {
  if (error) {return console.log(error)}

  app.listen(5000, () => {
    console.log('Server is running on localhost:5000');
  });
});