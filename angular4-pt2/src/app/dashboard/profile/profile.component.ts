import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../../app.component.css',
    './profile.component.css'
  ],
  providers: [UserService]
})

export class ProfileComponent implements OnInit {
  userError = '';
  user = {
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    password: ''
  };

  constructor(public router: Router, public userService: UserService) {
    // localStorage.users = '';
  }

  updateUser(form): void {
    if (form.valid) {
      this.userError = '';

      const regFields = form.form.controls;
      const firstName = regFields.firstName.value;
      const lastName = regFields.lastName.value;
      const email = regFields.email.value;
      const birthYear = regFields.birthYear.value;
      const password = regFields.password.value;

      const user = {
        firstName,
        lastName,
        email,
        birthYear,
        password
      };

      this.userError = this.userService.updateUser(user);
    }
  }

  ngOnInit() {
    console.log(localStorage.myAcc);
    console.log(localStorage.users);

    this.user = JSON.parse(localStorage.myAcc);
    console.log(this.user);
  }

}