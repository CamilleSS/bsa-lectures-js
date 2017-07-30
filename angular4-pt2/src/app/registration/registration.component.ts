import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    '../app.component.css',
    './registration.component.css'
  ]
})
export class RegistrationComponent implements OnInit {
  // regForm = NgForm;
  user = {
    firstName: 'qqq',
    lastName: 'qqq',
    email: 'q@q.qq',
    birthYear: '1111',
    password: 'qqq'
  };

  userExists = '';

  constructor(public router: Router) {
    // localStorage.users = '';
  }

  register(form): void {
    if (form.valid) {
      this.userExists = '';
      if (!localStorage.users) {
        localStorage.setItem('users', '');
      }

      const regFields = form.form.controls;
      const firstName = regFields.firstName.value;
      const lastName = regFields.lastName.value;
      const email = regFields.email.value;
      const birthYear = regFields.birthYear.value;
      const password = regFields.password.value;

      const users = localStorage.users;
      if (users.length > 0) {
        if (users.includes(`"email":"${email}"`)) {
          this.userExists = 'Email is already registered';
          return;
        }
      }

      if (!this.userExists) {
        const user = {
          firstName,
          lastName,
          email,
          birthYear,
          password
        };

        localStorage.users += `${JSON.stringify(user)};`;
        console.log(localStorage.users);

        this.router.navigate(['/dashboard']);
        return;
      }
    }
  }

  ngOnInit() {
    console.log(localStorage.users);
  }

}
