import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    '../app.component.css',
    './registration.component.css'
  ],
  providers: [UserService]
})

export class RegistrationComponent implements OnInit {
  userError = '';
  user = {
    firstName: 'qqq',
    lastName: 'qqq',
    email: 'q@q.qq',
    birthYear: '1111',
    password: 'qqq'
  };

  constructor(public router: Router, public userService: UserService) {
    // localStorage.users = '';
  }

  register(form): void {
    if (form.valid) {
      this.userError = '';
      if (!localStorage.users) {
        localStorage.setItem('users', '');
      }

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

      this.userError = this.userService.addNewUser(user);

      if (!this.userError) {
        this.router.navigate(['/dashboard']);
        return;
      }
    }
  }

  ngOnInit() {
    console.log('MY ACC', localStorage.myAcc);
    console.log('USER LIST', localStorage.users);
  }
}
