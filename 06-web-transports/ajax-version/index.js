const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const messages = [];
const users = [];

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.js'));
});

app.get('/messages', (req, res) => {
  console.log('messages:', messages.length);
  res.json(messages);
});

app.post('/messages', (req, res) => {
  console.log('messages:', messages.length);
  if (messages.length === 100) {
    messages.shift();
  }
  messages.push(req.body);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  users.push(req.body);
});

// const routes = require('./routes/api/routes')(app);

app.listen(5000, () => {
  console.log('Server is running on localhost:5000');
});