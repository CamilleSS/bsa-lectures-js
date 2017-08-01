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
    email: '',
    answer: ''
  };
  mathExpression = {
    'number1': 10000,
    'number2': 800
  };
  numberAnswer = (this.mathExpression.number1 + this.mathExpression.number2);
  stringAnswer = this.numberAnswer.toString().substring(0, 3);

  constructor(public router: Router) {}

  remindPassword(form): void {
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
          const users = JSON.parse(usersRaw);

          for (const user of users) {
            if (user.email === email) {
              console.log(user.email);

              if (this.stringAnswer === answer) {
                const passedEmail = user.email;
                console.log(passedEmail);
                const passedPassword = user.password;
                this.router.navigate([
                  `/remind-password/${passedEmail}|||${passedPassword}`
                ]);
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
