import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  addNewUser(user) {
    let userError = '';
    const users = localStorage.users;
    if (users.length > 0) {
      if (users.includes(`"email":"${user.email}"`)) {
        userError = 'Email is already registered';
        return userError;
      }
    }

    const usersJson = users.length === 0 ? [] : JSON.parse(users);
    usersJson.push(user);
    localStorage.users = JSON.stringify(usersJson);
    localStorage.myAcc = JSON.stringify(user);

    return userError;
  }

  getSingleUser(email) {
    const users = this.getUsers();
    const getUser = user => {
      return user.email === email;
    };
    const foundUser = users.find(getUser);
    return foundUser;
  }

  updateUser(userData) {
    let userError = '';
    const usersRaw = localStorage.users;
    const currentUserEmail = JSON.parse(localStorage.myAcc).email;

    if (currentUserEmail !== userData.email &&
        usersRaw.includes(`"email":"${userData.email}"`)) {
      userError = 'Email is already registered';
      return userError;
    }

    const users = this.getUsers();

    const userIndex = users.map(user => {
      console.log(user, currentUserEmail);
      return user.email;
    }).indexOf(currentUserEmail);
    users[userIndex] = userData;
    localStorage.myAcc = JSON.stringify(userData);
    localStorage.users = JSON.stringify(users);
    return userError;
  }

  getUsers() {
    const usersRaw = localStorage.users;
    const users = JSON.parse(usersRaw);
    return users;
  }

  logOut() {
    localStorage.removeItem('myAcc');
  }
}
