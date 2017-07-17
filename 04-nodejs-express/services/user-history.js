const users = [{
  "id": 1,
  "name": "Marge",
  "email": "marge@gmail.com"
}, {
  "id": 2,
  "name": "Homer",
  "email": "homer@gmail.com"
}, {
  "id": 3,
  "name": "Bart",
  "email": "bart@gmail.com"
}, {
  "id": 4,
  "name": "Lisa",
  "email": "lisa@gmail.com"
}, {
  "id": 5,
  "name": "Maggie",
  "email": "maggie@gmail.com"
}];

const messages = [{
  "id": 1,
  "senderId": 1,
  "receiverId": 3,
  "messageText": "In nisi felis, laoreet ut blandit vulputate, volutpat at leo. Curabitur nec sem lacus. Nunc metus sem, blandit ac quam at, ornare mattis nisi."
}, {
  "id": 2,
  "senderId": 3,
  "receiverId": 2,
  "messageText": "Pellentesque consectetur vulputate diam ut feugiat. Phasellus pharetra augue nec ex auctor, a blandit neque scelerisque."
}, {
  "id": 3,
  "senderId": 2,
  "receiverId": 4,
  "messageText": "Phasellus eget fringilla dolor."
}, {
  "id": 4,
  "senderId": 3,
  "receiverId": 4,
  "messageText": "Morbi porttitor sapien justo, vitae molestie dui mollis id. Sed quis purus eget massa venenatis maximus eu ac ipsum."
}, {
  "id": 5,
  "senderId": 4,
  "receiverId": 5,
  "messageText": "In facilisis, augue id malesuada egestas, leo ex dictum ex, at mollis tortor felis convallis leo."
}, {
  "id": 6,
  "senderId": 5,
  "receiverId": 1,
  "messageText": "XHZJufhcjsdkfvJ{C{LSNM"
}];

const findUser = userId => {
  let error = null;
  if (!(Number.isInteger(userId) && userId > 0)) {
    error = new Error('Id is not valid');
  }

  let index;
  let user = users.find((el, pos) => {
    if (el.id === userId) {
      index = pos;
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