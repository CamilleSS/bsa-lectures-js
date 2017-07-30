import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: [
    '../app.component.css',
    './remind-password.component.css'
  ]
})

export class RemindPasswordComponent implements OnInit {
  userError = '';
  user = {
    email: 'q@q.qq',
    answer: 111,
    password: ''
  };
  mathExpression = {
    'number1': 10000,
    'number2': 800
  };
  numberAnswer = (this.mathExpression.number1 + this.mathExpression.number2);
  stringAnswer = this.numberAnswer.toString().substring(0, 3);

  constructor(public router: Router) {}

  remindPassword(form): void {
    this.user.password = '';
    if (form.valid) {
      this.userError = '';
      if (!localStorage.users) {
        localStorage.setItem('users', '');
        this.userError = 'You haven\'t registered yet';
        return;
      }

      const remindPasswordFields = form.form.controls;
      const email = remindPasswordFields.email.value;
      const answer = remindPasswordFields.answer.value;
      const usersRaw = localStorage.users;

      if (usersRaw.length > 0) {
        if (usersRaw.includes(`"email":"${email}"`)) {
          const users = usersRaw.split(';');

          for (const user of users) {
            if (user.includes(`"email":"${email}"`)) {
              const userJson = JSON.parse(user);

              console.log(this.stringAnswer, answer);

              if (this.stringAnswer === answer) {
                console.log('REMIND');
                this.user.password = userJson.password;
                return;
              } else {
                this.userError = 'Wrong answer';
                return;
              }
            }
          }
        }
      }
      this.userError = 'You haven\'t registered yet';
    }
  }

  ngOnInit() {}

}
