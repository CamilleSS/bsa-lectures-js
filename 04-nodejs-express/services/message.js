const messages = [{
  id: 1,
  senderId: 1,
  receiverId: 3,
  messageText: "In nisi felis, laoreet ut blandit vulputate, volutpat at leo. Curabitur nec sem lacus. Nunc metus sem, blandit ac quam at, ornare mattis nisi."
}, {
  id: 2,
  senderId: 3,
  receiverId: 2,
  messageText: "Pellentesque consectetur vulputate diam ut feugiat. Phasellus pharetra augue nec ex auctor, a blandit neque scelerisque."
}, {
  id: 3,
  senderId: 2,
  receiverId: 4,
  messageText: "Phasellus eget fringilla dolor."
}, {
  id: 4,
  senderId: 3,
  receiverId: 4,
  messageText: "Morbi porttitor sapien justo, vitae molestie dui mollis id. Sed quis purus eget massa venenatis maximus eu ac ipsum."
}, {
  id: 5,
  senderId: 4,
  receiverId: 5,
  messageText: "In facilisis, augue id malesuada egestas, leo ex dictum ex, at mollis tortor felis convallis leo."
}, {
  id: 6,
  senderId: 5,
  receiverId: 1,
  messageText: "XHZJufhcjsdkfvJ{C{LSNM"
}];

const findMessage = id => {
  let error = null;
  if (!(Number.isInteger(id) && id > 0)) {
    error = new Error('Id is not valid');
  }

  let index;
  let message = messages.find((el, id) => {
    if (el.id === id) {
      index = id;
      return true;
    } else {
      return false;
    }
  });

  return {message, index, error};
};

module.exports = {
  findAll: callback => {
    callback(null, messages);
  },

  findOne: (id, callback) => {
    let {error, message} = findMessage(id);
    callback(error, message);
  },

  add: (message, callback) => {
    if (!(Number.isInteger(message.id) && message.id > 0)) {
      messages.push(message);
      callback(null);
    } else {
      callback(new Error('Id is not valid'));
    }
  },

  findAndDelete: (id, callback) => {
    let {error, message, index} = findMessage(id);
    if (!(Number.isInteger(index) && index > 0)) {
      messages.splice(index, 1);
    } else {
      error = new Error('Id is not valid');
      // callback(new Error('Id is not valid'));
    }
    callback(error);
  },

  findAndUpdate: (id, message, callback) => {
    let {error, index} = findMessages(id);
    messages[index] = Object.assign(messages[index], message);
    callback(error);
  }
};