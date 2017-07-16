const users = [{
  id: 1,
  name: "Marge",
  email: "marge@gmail.com",
  birthdate: "01/01/1970"
}, {
  id: 2,
  name: 'Homer',
  email: "homer@gmail.com",
  birthdate: "20/08/1960"
}, {
  id: 3,
  name: 'Bart',
  email: "bart@gmail.com",
  birthdate: "31/07/1980"
}, {
  id: 4,
  name: "Lisa",
  email: "lisa@gmail.com",
  birthdate: "15/03/1982"
}, {
  id: 5,
  name: "Maggie",
  email: "maggie@gmail.com",
  birthdate: "01/12/1990"
}];

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

const findUser = id => {
  let error = null;
  if (!(Number.isInteger(id) && id > 0)) {
    error = new Error('Id is not valid');
  }

  let index;
  let user = users.find((el, id) => {
    if (el.id === id) {
      index = id;
      return true;
    } else {
      return false;
    }
  });

  return {user, index, error};
};

module.exports = {
  findOtherUsers: (id, callback) => {
    let {error, user, index} = findUser(id);
    let otherUserIds = [];
    for (let i = 0; i < messages.length; i++) {
      let message = messages[i];
      let otherUserId;

      if (message.senderId === id) {
        otherUserId = message.receiverId;
      } else if (message.receiverId === id) {
        otherUserId = message.senderId;
      } else {
        continue;
      }
      otherUserIds.push(otherUserId);
    }

    otherUsers = users.filter(user => {
      return otherUserIds.includes(user.id);
    });

    callback(error, otherUsers);
  }
};