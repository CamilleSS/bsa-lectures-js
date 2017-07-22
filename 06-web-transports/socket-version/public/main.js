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
let statusTimeout;
let userStatusColor = {
  appeared: '#f1f26b',
  online: '#2df25d',
  offline: '#f27752'
};

(() => {
  window.removeEventListener('beforeunload', () => {});

  // let user in chat after validating username and nickname
  saveUserdataButton.addEventListener('click', () => {
    let validData = true;
    username = usernameField.value;
    nickname = nicknameField.value;
    presence = 'appeared';

    if (username.length < 3 || nickname.length < 3 ||
        username.length > 20 || nickname.length > 20) {
      validData = false;
      userdataError.style.display = 'block';
    }

    if (validData) {
      let data = {username, nickname, presence};
      socket.emit('chat user', data);
    }
  });

  socket.on('chat user', data => {
    userList.style.display = 'block';
    createUserElement(data, userList);
  });

  socket.on('valid user', id => {
    socket.emit('user list length');
    userdataError.style.display = 'none';
    setUsername.innerHTML = `Your username: ${username}`;
    chatBox.style.display = 'block';
    userdata.style.display = 'none';

    userId = id;
    window.addEventListener('beforeunload', () => {
      socket.emit('leaving', userId);

      let userElement = userList.querySelectorAll('.user')[userId];
      let name = userElement.querySelector('.username').innerHTML;
      let userStatus = userElement.querySelector('.status');
      userStatus.style.backgroundColor = userStatusColor.offline;

      let sender = 'chatbot';
      let time = new Date().getTime();
      let messageText = `${name} left the chat`;
      let data = {username: sender, nickname: '', time, messageText};
      socket.emit('leaving message', data);

      socket.close();
    });
  });

  socket.on('not valid user', error => {
    userdataError.innerHTML = error;
    userdataError.style.display = 'block';
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

  // send message on click after validating it
  sendMessageButton.addEventListener('click', () => {
    let validData = true;
    let messageText = messageField.value;

    if (messageText.length < 3 || messageText.length > 1000) {
      validData = false;
      messageError.style.display = 'block';
    }

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

    if (data.username === 'chatbot') {
      let message = constructElement(null, 'div', 'message', '', null, false);

      let senderElement = document.createElement('div');
      senderElement.className = 'sender';
      senderElement.innerHTML = data.username;
      message.appendChild(senderElement);

      let timeElement = document.createElement('div');
      timeElement.className = 'time';
      let date = new Date(data.time);
      let timeToDisplay = date.toLocaleString();
      timeElement.innerHTML = timeToDisplay;
      message.appendChild(timeElement);

      let textElement = document.createElement('div');
      textElement.className = 'text';
      textElement.innerHTML = data.messageText;
      message.appendChild(textElement);

      messageList.appendChild(message);
      messageList.style.display = 'block';
      clearTimeout(statusTimeout);

    } else {
      createMessageElement(data, messageList);
    }

    if (messageList.childElementCount > 100) {
      messageList.removeChild(messageList.childNodes[0]);
    }
  });

  socket.on('not valid message', error => {
    messageError.innerHTML = error;
    messageError.style.display = 'block';
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

/*
 * create user element with username, nickname and status
 * and append it to user list
 */
const createUserElement = (data, parentElement) => {
  let user;
  user = constructElement(data, 'div', 'user', null, null, false);
  let username = constructElement(data, 'div', 'username', 'username', user);
  let status = constructElement(data, 'div', 'status', 'status', user);
  let nickname = constructElement(data, 'div', 'nickname', 'nickname', user);
  parentElement.appendChild(user);
};

/*
 * create message element with sender's name, time, message text
 * and append it to message list
 */
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

// individual options for user/message element handling
const prepareElement = {
  'username': (element, data) => element.innerHTML = data.username,
  'status': (element, data) => {
      statusTimeout = setTimeout(() => {
        if (data.presence === 'offline') {
          presence = data.presence;
        } else {
          presence = 'online';
        }
        element.style.backgroundColor = userStatusColor[presence];
      }, 10000);
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