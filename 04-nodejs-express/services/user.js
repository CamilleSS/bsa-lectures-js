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
  findAll: callback => {
    callback(null, users);
  },

  findOne: (id, callback) => {
    let {error, user} = findUser(id);
    callback(error, user);
  },

  add: (user, callback) => {
    if (Number.isInteger(user.id) && user.id > 0) {
      users.push(user);
      callback(null);
    } else {
      callback(new Error('Id is not valid'));
    }
  },

  findAndDelete: (id, callback) => {
    let {error, user, index} = findUser(id);
    if (Number.isInteger(index) && index > 0) {
      users.splice(index, 1);
    } else {
      error = new Error('Id is not valid');
    }
    callback(error);
  },

  findAndUpdate: (id, userData, callback) => {
    let {error, index} = findUser(id);
    users[index] = Object.assign(users[index], userData);
    callback(error);
  }
};