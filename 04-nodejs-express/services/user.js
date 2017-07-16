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
  findAll: callback => {
    callback(null, users);
  },

  findOne: (id, callback) => {
    let {error, user} = findUser(id);
    callback(error, user);
  },

  add: (user, callback) => {
    if (!(Number.isInteger(user.id) && user.id > 0)) {
      users.push(user);
      callback(null);
    } else {
      callback(new Error('Id is not valid'));
    }
  },

  findAndDelete: (id, callback) => {
    let {error, user, index} = findUser(id);
    if (!(Number.isInteger(index) && index > 0)) {
      users.splice(index, 1);
    } else {
      error = new Error('Id is not valid');
      // callback(new Error('Id is not valid'));
    }
    callback(error);
  },

  findAndUpdate: (id, user, callback) => {
    let {error, index} = findUser(id);
    users[index] = Object.assign(users[index], user);
    callback(error);
  }
};