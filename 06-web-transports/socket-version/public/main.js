'use strict';

const userdataError = document.getElementById('userdata-error');
const messageError = document.getElementById('message-error');

const userdata = document.getElementById('userdata');
const usernameField = document.getElementById('username');
const nicknameField = document.getElementById('nickname');
const saveUserdataButton = document.getElementById('save-userdata');
const userList = document.getElementById('user-list');

const chatBox = document.getElementById('chat-box');
const setUsername = document.getElementById('set-username');
const messageList = document.getElementById('message-list');
const typingStatus = document.getElementById('typing-status');
const messageField = document.getElementById('message-field');
const sendMessageButton = document.getElementById('send-message');

const socket = io.connect();

let username;
let nickname;
let presence;

let userId;
let userListLength;
let statusTimeout;
let userStatusColor = {
  appeared: '#f1f26b',
  online: '#2df25d',
  offline: '#f27752'
};

(() => {
  window.removeEventListener('beforeunload', () => {});
  socket.on('user list length', length => {
    userListLength = length;
  });

  saveUserdataButton.addEventListener('click', () => {
    let validData = true;
    username = usernameField.value;
    nickname = nicknameField.value;
    presence = 'appeared';

    if (username.length < 3 || nickname.length < 3) {
      validData = false;
      userdataError.style.display = 'block';
    }

    if (validData) {
      let data = {username, nickname, presence};
      socket.emit('chat user', data);
    }
  });

  socket.on('valid user', id => {
    userdataError.style.display = 'none';
    setUsername.innerHTML = `Your username: ${username}`;
    chatBox.style.display = 'block';
    userdata.style.display = 'none';

    console.log(id);
    userId = id;
    window.addEventListener('beforeunload', () => {
      if (typeof userId === 'undefined') {
        userId = 0;
      }
      socket.emit('leaving', userId);
      socket.close();
    });
});

  socket.on('chat user', data => {
    userList.style.display = 'block';
    createUserElement(data, userList);
  });

  socket.on('not valid user', error => {
    userdataError.innerHTML = error;
    userdataError.style.display = 'block';
  });

  sendMessageButton.addEventListener('click', () => {
    let validData = true;
    let messageText = messageField.value;

    if (validData) {
      let time = new Date().getTime();
      let data = {username, nickname, time, messageText};
      socket.emit('chat message', data);
      messageError.style.display = 'none';
      messageField.value = '';
    }
  });

  socket.on('chat message', data => {
    messageList.style.display = 'block';
    createMessageElement(data, messageList);
    if (messageList.childElementCount > 100) {
      messageList.removeChild(messageList.childNodes[0]);
    }
  });

  socket.on('not valid message', error => {
    messageError.innerHTML = error;
    messageError.style.display = 'block';
  });

  // fetch the list of users
  socket.on('chat users', users => {
    if (users.length > 0) {
      userList.style.display = 'block';
    }
    removeChildren(userList);
    for (let i = 0; i < users.length; i++) {
      createUserElement(users[i], userList);
    }
  });

  // change status and send a message on user leaving
  socket.on('leaving', id => {
    console.log(id);
    let userElement = userList.querySelectorAll('.user')[id];
    console.log(userElement);
    let userStatus = userElement.querySelector('.status');
    userStatus.style.backgroundColor = userStatusColor.offline;

    let message = constructElement(null, 'div', 'message', '', null, false);
    let sender = document.createElement('div');
    sender.className = 'sender';
    sender.innerHTML = 'chatbot';
    message.appendChild(sender);
    let timeAmount = new Date().getTime();
    let date = new Date(timeAmount);
    let time = document.createElement('div');
    time.className = 'time';
    time.innerHTML = date.toLocaleString();
    message.appendChild(time);
    let text = document.createElement('div');
    text.className = 'text';
    text.innerHTML = `${username} left the chat`;
    message.appendChild(text);
    messageList.appendChild(message);
    console.log(message);

    messageList.style.display = 'block';
    clearTimeout(statusTimeout);
  });

  // fetch the list of messages
  socket.on('chat history', messages => {
    if (messages.length > 0) {
      messageList.style.display = 'block';
    }
    removeChildren(messageList);
    for (let i = 0; i < messages.length; i++) {
      createMessageElement(messages[i], messageList);
    }
  });

  // display if someone is typing a message
  let typingTimeout = null;

  messageField.addEventListener('keydown', () => {
    socket.emit('typing', username);
  });

  socket.on('typing', user => {
    typingStatus.innerHTML = `${user} is typing`;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      typingStatus.innerHTML = '';
    }, 1000);
  });
})();

const createUserElement = (data, parentElement) => {
  let user;
  user = constructElement(data, 'div', 'user', null, null, false);
  let username = constructElement(data, 'div', 'username', 'username', user);
  let status = constructElement(data, 'div', 'status', 'status', user);
  let nickname = constructElement(data, 'div', 'nickname', 'nickname', user);
  parentElement.appendChild(user);
};

const createMessageElement = (data, parentElement) => {
  let message;
  message = constructElement(null, 'div', 'message', '', null, false);
  let sender = constructElement(data, 'div', 'sender', 'sender', message);
  let time = constructElement(data, 'div', 'time', 'time', message);
  let text = constructElement(data, 'div', 'text', 'text', message);

  if (text.innerHTML.includes(`@${username}`)) {
    message.style.backgroundColor = '#fff2b7';
  }
  parentElement.appendChild(message);
};

// individual options for element handling
const prepareElement = {
  'username': (element, data) => element.innerHTML = data.username,
  'status': (element, data) => {
    socket.emit('user list length');
    console.log(userId);
    console.log(userListLength);
    // if (userListLength === userId || userId === 0 && userListLength === 0) {
      statusTimeout = setTimeout(() => {
        presence = 'online';
        element.style.backgroundColor = userStatusColor[presence];
      }, 60000);
    // }
    element.style.backgroundColor = userStatusColor[data.presence];
  },
  'nickname': (element, data) => element.innerHTML = `@${data.nickname}`,
  'sender': (element, data) => element.innerHTML = `${data.username} @${data.nickname}`,
  'time': (element, data) => {
    let date = new Date(data.time);
    element.innerHTML = date.toLocaleString();
  },
  'text': (element, data) => element.innerHTML = data.messageText
};

// create DOM element, optionally modify/handle it and attach it to the parent element
let constructElement = (data,
                        tagName,
                        className = '',
                        ownFunction = null,
                        parentElement = null,
                        messageChild = true) => {
  let element = document.createElement(tagName);
  if (className) {element.className = className}
  if (ownFunction) {prepareElement[ownFunction](element, data)}
  if (messageChild) {parentElement.appendChild(element)}
  return element;
};

// remove all children nodes from the parent element
const removeChildren = element => {
  while (element.hasChildNodes()) {
    element.removeChild(element.childNodes[0]);
  }
};