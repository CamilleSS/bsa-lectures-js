const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const path = require('path');

const messages = [];
const users = [];

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.js'));
});

io.on('connect', socket => {
  console.log('Connection established');

  socket.on('chat user', user => {
    let validData = true;
    let errorMessage;
    if (user.username.length < 3 || user.nickname.length < 3 ||
        user.username.length > 20 || user.nickname.length > 20) {
      validData = false;
      errorMessage = 'Username and nickname should contain at least 3 characters';
      socket.emit('not valid user', errorMessage);
    }

    if (validData) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === user.username ||
          users[i].nickname === user.nickname) {
          validData = false;
          errorMessage = 'Username or nickname are already taken';
          socket.emit('not valid user', errorMessage);
          break;
        }
      }
    }

    if (validData) {
      let id = users.length;
      socket.emit('valid user', id);
      users.push(user);
      io.emit('chat user', user);
    }
  });

  socket.on('chat message', msg => {
    let validData = true;
    if (msg.messageText.length < 3 || msg.messageText.length > 1000) {
      validData = false;
      errorMessage = 'Message should contain at least 3 characters';
      socket.emit('not valid message', errorMessage);
    }

    if (validData) {
      if (messages.length >= 100) {
        messages.shift();
      }
      messages.push(msg);
      console.log(messages.length);
      io.emit('chat message', msg);
    }
  });

  socket.emit('chat users', users);
  socket.emit('chat history', messages);

  socket.on('typing', user => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('leaving', id => {
    if (users.length > 0) {
      users[id].presence = 'offline';
    }
  });

  socket.on('leaving message', data => {
    console.log(data);
    messages.push(data);
    console.log(messages);
    io.emit('chat message', data);
    console.log(messages.length);
  });
});

http.listen(5000, () => {
  console.log('Server is running on localhost:5000');
});