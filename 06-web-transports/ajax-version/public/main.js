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
const messageField = document.getElementById('message-field');
const sendMessageButton = document.getElementById('send-message');

let username;
let nickname;

// handle ajax requests
const ajaxRequest = (
  url = '/',
  method = 'GET',
  callback = () => {},
  data = {},
  xmlHttp = new XMLHttpRequest()
) => {
  xmlHttp.open(method, url, true);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send(JSON.stringify(data));

  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
      callback(xmlHttp.responseText);
    }
  }
};

// fetch the list of users
const getUsers = () => {
  ajaxRequest('/users', 'GET', users => {
    if (users.length > 0) {
      userList.style.display = 'block';
    }
    let renderedUsers = document.getElementsByClassName('user');
    users = JSON.parse(users);

    if (users.length > renderedUsers.length) {
      removeChildren(userList);
      for (let i in users) {
        if (users.hasOwnProperty(i)) {
          let user = constructElement(null, 'div', 'user', '', null, false);
          let username = constructElement(users[i], 'div', 'username', 'username', user);
          let nickname = constructElement(users[i], 'div', 'nickname', 'nickname', user);
          userList.appendChild(user);
        }
      }
    }
  });
};

// fetch the list of messages
const getMessages = () => {
  ajaxRequest('/messages', 'GET', messages => {
    if (messages.length > 0) {
      messageList.style.display = 'block';
    }
    let renderedMessages = document.getElementsByClassName('message');
    messages = JSON.parse(messages);

    if (messages.length > renderedMessages.length) {
      console.log(messages.length, renderedMessages.length);
      removeChildren(messageList);
      for (let i in messages) {
        if (messages.hasOwnProperty(i)) {
          let message = constructElement(null, 'div', 'message', '', null, false);
          let sender = constructElement(messages[i], 'div', 'sender', 'sender', message);
          let time = constructElement(messages[i], 'div', 'time', 'time', message);
          let text = constructElement(messages[i], 'div', 'text', 'text', message);

          if (text.innerHTML.includes(`@${username}`)) {
            message.style.backgroundColor = '#fff2b7';
          }
          messageList.appendChild(message);
        }
      }
    }
  });
};

(() => {
  saveUserdataButton.addEventListener('click', () => {
    let validData = true;
    username = usernameField.value;
    nickname = nicknameField.value;

    if (username.length < 3 || nickname.length < 3 ||
        username.length > 20 || nickname.length > 20) {
      validData = false;
      userdataError.style.display = 'block';
    }

    if (validData) {
      let data = {username, nickname};
      ajaxRequest('/users', 'POST', () => {
        userdataError.style.display = 'none';
        setUsername.innerHTML = `Your username: ${username}`;
        chatBox.style.display = 'block';
        userdata.style.display = 'none';
      }, data);
    }
  });

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
      ajaxRequest('/messages', 'POST', () => {
        messageError.style.display = 'none';
        messageField.value = '';
      }, data);
    }
  });

  getUsers();
  getMessages();
  setInterval(() => {
    getUsers();
    getMessages();
  }, 1000);
})();

// individual options for element handling
const prepareElement = {
  'username': (element, data) => element.innerHTML = data.username,
  'nickname': (element, data) => element.innerHTML = `@${data.nickname}`,
  'sender': (element, data) => element.innerHTML = `${data.username} @${data.nickname}`,
  'time': (element, data) => {
    let date = new Date(data.time);
    element.innerHTML = date.toLocaleString();
  },
  'text': (element, data) => element.innerHTML = data.messageText
};

// create DOM element, optionally modify/handle it and attach it to a parent element
let constructElement = (data,
                        tagName,
                        className = '',
                        ownFunction = null,
                        parentElement,
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