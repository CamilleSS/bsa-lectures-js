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

let id = 0;
let statusTimeout = null;
let userStatusColor = {
  appeared: '#f1f26b',
  online: '#2df25d',
  offline: '#f27752'
};

(() => {
  saveUserdataButton.addEventListener('click', () => {
    let username = usernameField.value;
    let nickname = nicknameField.value;
    let presence = 'appeared';
    let userId = id;
    let data = {username, nickname, presence, userId};

    socket.emit('chat user', data);

    setUsername.innerHTML = `Your username: ${username}`;
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('presence', presence);
    id++;
  });

  sendMessageButton.addEventListener('click', () => {
    let messageText = messageField.value;
    let time = new Date().getTime();
    let username = sessionStorage.username;
    console.log(username);
    let data = {username, nickname, time, messageText};
    socket.emit('chat message', data);
  });

  // fetch the list of users
  socket.on('chat users', data => {
    removeChildren(userList);
    for (let i = 0; i < data.length; i++) {
      createUserElement(data[i], userList);
    }
  });

  socket.on('chat user', data => {
    createUserElement(data, userList);
    statusTimeout = setTimeout(() => {
      let userId = sessionStorage.userId;
      let presence = 'online';
      let userStatus = document.querySelector(`.user[userId="${userId}"] .status`);
      console.log(presence);
      userStatus.style.backgroundColor = userStatusColor[presence];
    }, 3000);
  });

  // change status and send a message on user leaving
  window.addEventListener('beforeunload', () => {
    let userId = sessionStorage.userId;
    socket.emit('leaving', userId);
  });

  socket.on('leaving', userId => {
    console.log(document.querySelector(`.user[userId="${userId}"] .status`), userId);
    let userStatus = document.querySelector(`.user[userId="${userId}"] .status`);
    let userElement = userStatus.parentElement;
    let username = userElement.querySelector('.username').innerHTML;
    console.log(userElement, username);
    userStatus.style.backgroundColor = userStatusColor.offline;

    let message = constructElement(null, 'div', 'message', '', null, false);
    let sender = document.createElement('div');
    sender.className = 'sender';
    sender.innerHTML = 'chatbot';
    message.appendChild(sender);
    let timeAmount = new Date().getTime();
    let date = new Date(timeAmount);
    console.log(date);
    let time = document.createElement('div');
    time.className = 'time';
    time.innerHTML = date.toLocaleString();
    console.log(time);
    message.appendChild(time);
    let text = document.createElement('div');
    text.className = 'text';
    text.innerHTML = `${username} left the chat`;
    message.appendChild(text);
    messageList.appendChild(message);

    clearTimeout(statusTimeout);
  });

  // fetch the list of messages
  socket.on('chat history', data => {
    removeChildren(messageList);
    for (let i = 0; i < data.length; i++) {
      createMessageElement(data[i], messageList);
    }
  });

  socket.on('chat message', data => {
    createMessageElement(data, messageList);
    if (messageList.childElementCount > 100) {
      messageList.removeChild(messageList.childNodes[0]);
    }
    console.log(messageList.childElementCount);
  });

  // display if someone is typing a message
  let typingTimeout = null;

  messageField.addEventListener('keydown', () => {
    let data = sessionStorage.username;
    socket.emit('typing', data);
  });

  socket.on('typing', data => {
    typingStatus.innerHTML = `${data} is typing`;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      typingStatus.innerHTML = '';
    }, 2000);
  });
})();

const createUserElement = (data, parentElement) => {
  let user;
  user = constructElement(data, 'div', 'user', 'user', null, false);
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
  parentElement.appendChild(message);
};

// individual options for element handling
const prepareElement = {
  'user': (element, data) => {
    element.setAttribute('userId', data.userId);
  },
  'username': (element, data) => element.innerHTML = data.username,
  'status': (element, data) => element.style.backgroundColor = userStatusColor[data.presence],
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