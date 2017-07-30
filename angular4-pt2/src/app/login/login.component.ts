import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../app.component.css',
    './login.component.css'
  ]
})

export class LoginComponent implements OnInit {
  userError = '';
  user = {
    email: 'q@q.qq',
    password: 'qqq'
  };

  constructor(public router: Router) {}

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
      const usersRaw = localStorage.users;

      if (usersRaw.length > 0) {
        if (usersRaw.includes(`"email":"${email}"`)) {
          const users = usersRaw.split(';');

          for (const user of users) {
            if (user.includes(`"email":"${email}"`)) {
              const userJson = JSON.parse(user);

              if (userJson.password === password) {
                console.log('LOGIN');
                this.router.navigate(['/dashboard']);
                return;
              } else {
                this.userError = 'Wrong password';
                return;
              }
            }
          }
        }
      }
      this.userError = 'You haven\'t registered yet';
    }
  }

  ngOnInit() {
    console.log(localStorage.users);
  }

}
