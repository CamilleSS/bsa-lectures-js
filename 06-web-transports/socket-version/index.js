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

// handle socket
io.on('connect', socket => {
  console.log('Connection established');

  socket.on('chat user', user => {
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
      io.emit('chat user', user);
    }
  });

  socket.on('chat message', msg => {
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
      io.emit('chat message', msg);
    }
  });

  socket.emit('chat users', users);
  socket.emit('chat history', messages);

  socket.on('typing', user => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('leaving', data => {
    socket.broadcast.emit('leaving', data);
  });
});

http.listen(5000, () => {
  console.log('Server is running on localhost:5000');
});