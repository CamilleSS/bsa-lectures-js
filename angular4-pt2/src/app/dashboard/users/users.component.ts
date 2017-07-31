import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    '../../app.component.css',
    './users.component.css'
  ],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  users = this.userService.getUsers();

  constructor(public userService: UserService) {}

  ngOnInit() {
    console.log(localStorage.myAcc);
    console.log(localStorage.users);
  }

}
