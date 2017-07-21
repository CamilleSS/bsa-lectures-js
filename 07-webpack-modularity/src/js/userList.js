const _ = require('lodash');
const avatarUrl = require("file-loader!../images/default-avatar.jpg");

// import * as avatarUrl from '../images/default-avatar.jpg';

// handle user list
function userList(users){
  const container = document.getElementById('root');
  const sortedUsers = _.sortBy(users, 'age');
  this.showList = () => {
    sortedUsers.forEach((user) => {
      const div = document.createElement("div");
      const avatar = document.createElement("img");
      avatar.setAttribute('src', avatarUrl);
      div.appendChild(avatar);
      div.append(user.name + ' ' + user.age);
      container.appendChild(div);
    });
  }
}

module.exports = userList;