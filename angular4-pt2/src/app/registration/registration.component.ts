import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    '../app.component.css',
    '../login/login.component.css',
    './registration.component.css'
  ],
  providers: [UserService]
})

export class RegistrationComponent implements OnInit {
  title = 'Registration';
  buttonName = 'Register';
  userError = '';
  user = {
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    password: ''
  };

  constructor(public router: Router, public userService: UserService) {}

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
      }
    }
  }

  methodOnSubmit(form): void {
    this.register(form);
  }

  ngOnInit() {}
}
