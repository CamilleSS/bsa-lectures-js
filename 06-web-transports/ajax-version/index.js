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

app.get('/users', (req, res) => {
  res.json(users);
  res.end();
});

app.post('/users', (req, res) => {
  let user = req.body;
  let validData = true;
  if (user.username.length < 3 || user.nickname.length < 3) {
    validData = false;
  }

  if (validData) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === user.username ||
        users[i].nickname === user.nickname) {
        validData = false;
        console.log('Data is not valid');
      }
    }
  }

  if (validData) {
    users.push(user);
  }
  res.end();
});

app.get('/messages', (req, res) => {
  res.json(messages);
  res.end();
});

app.post('/messages', (req, res) => {
  let msg = req.body;
  let validData = true;
  if (msg.messageText.length < 3) {
    validData = false;
    console.log('Data is not valid');
  }

  if (validData) {
    if (messages.length >= 100) {
      messages.shift();
    }
    messages.push(msg);
  }

  res.end();
});

app.listen(5000, () => {
  console.log('Server is running on localhost:5000');
});