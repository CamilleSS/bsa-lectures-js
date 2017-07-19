'use strict';

(() => {
  const userdataHeading = document.querySelector('#userdata-heading h2');
  const usernameField = document.getElementById('username');
  const nicknameField = document.getElementById('nickname');
  const saveUserdataButton = document.getElementById('save-userdata');
  const userList = document.getElementById('user-list');
  const setUsername = document.getElementById('set-username');
  const messageList = document.getElementById('message-list');
  const messageField = document.getElementById('message');
  const sendMessageButton = document.getElementById('send-message');

  let username;
  let nickname;
  let messageText;

  saveUserdataButton.addEventListener('click', () => {
    username = usernameField.value || 'Username';
    nickname = nicknameField.value;
    let data = {username, nickname};

    console.log('CLICK', data);

    fetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(console.log('SENT DATA'));

    userdataHeading.innerHTML = `Hello ${username}!`;
    setUsername.innerHTML = `Your username: ${username}`;
  });

  sendMessageButton.addEventListener('click', () => {
    messageText = messageField.value;
    let time = new Date().getTime();
    let data = {username, nickname, time, messageText};

    fetch('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(messageField.value = '')
  });

  // fetch the list of users
  const getUsers = () => {
    console.log('getUsers INIT');
    const fetchData = fetch('/users', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(status)
      .then(json)
      .catch(error => {
        console.log(
          `There was a problem with fetching the data. ${error}`
        );
      });

    fetchData.then(data => {
      // if (data.length) {
      //   userList.style.display = 'block';
      // }

      console.log('GOT DATA');

      removeChildren(userList);
      let user;

      for (let i = 0; i < data.length; i++) {
        user = constructElement(null, 'div', 'user', '', null, false);
        let username = constructElement(data[i], 'div', 'username', 'username', user);
        let nickname = constructElement(data[i], 'div', 'nickname', 'nickname', user);
        userList.appendChild(user);
        console.log(user);
      }
    });
  };

  // fetch the list of messages
  const getMessages = () => {
    const fetchData = fetch('/messages', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(status)
      .then(json)
      .catch(error => {
        console.log(
          `There was a problem with fetching the data. ${error}`
        );
      });

    fetchData.then(data => {
      // if (data.length) {
      //   messageList.style.display = 'block';
      // }

      removeChildren(messageList);
      let message;

      for (let i = 0; i < data.length; i++) {
        message = constructElement(null, 'div', 'message', '', null, false);
        let sender = constructElement(data[i], 'div', 'sender', 'sender', message);
        let time = constructElement(data[i], 'div', 'time', 'time', message);
        let text = constructElement(data[i], 'div', 'text', 'text', message);
        messageList.appendChild(message);
      }
    });
  };

  let status = response => {
    // if (response.status >= 200 && response.status < 300) {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  };

  let json = response => {
    return response.json();
  };

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

const removeChildren = element => {
  while (element.hasChildNodes()) {
    element.removeChild(element.childNodes[0]);
  }
};