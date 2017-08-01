import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../app.component.css',
    './login.component.css'
  ],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  userError = '';
  user = {
    email: '',
    password: ''
  };

  constructor(public router: Router, public userService: UserService) {}

  login(form): void {
    if (form.valid) {
      this.userError = '';
      if (!localStorage.users) {
        localStorage.setItem('users', '');
        this.userError = 'You haven\'t registered yet';
        return;
      }

      const loginFields = form.form.controls;
      const email = loginFields.email.value;
      const password = loginFields.password.value;

      const userJson = this.userService.getSingleUser(email);
      if (userJson) {
        if (userJson.password === password) {
          localStorage.myAcc = JSON.stringify(userJson);
          this.router.navigate(['/dashboard']);
          return;
        } else {
          this.userError = 'Wrong password';
          return;
        }
      }

      this.userError = 'You haven\'t registered yet';
    }
  }

  ngOnInit() {}

}
