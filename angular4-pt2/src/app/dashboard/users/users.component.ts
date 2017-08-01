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
  orderSymbols = {
    'default': '\u2195',
    'desc': '\u2193',
    'asc': '\u2191'
  };

  tableHeader = [
    {
      'property': 'firstName',
      'text': 'first name',
      'order': this.orderSymbols.default
    },
    {
      'property': 'lastName',
      'text': 'last name',
      'order': this.orderSymbols.default
    },
    {
      'property': 'email',
      'text': 'email',
      'order': this.orderSymbols.default
    },
    {
      'property': 'birthYear',
      'text': 'birth year',
      'order': this.orderSymbols.default
    },
    {
      'property': 'password',
      'text': 'password',
      'order': this.orderSymbols.default
    }
  ];

  field = '';
  order = '';
  query = '';
  lastTriggeredColumn: number;
  users = this.userService.getUsers();

  setOrder(index: number): void {
    this.refreshIcons(index);
    this.field = this.tableHeader[index].property;

    if (this.lastTriggeredColumn !== index) {
      this.order = '';
    }

    if (this.order === '' || this.order === 'asc') {
      this.tableHeader[index].order = this.orderSymbols.desc;
      this.order = 'desc';
    } else if (this.order === 'desc') {
      this.tableHeader[index].order = this.orderSymbols.asc;
      this.order = 'asc';
    }

    this.lastTriggeredColumn = index;
  }

  refreshIcons(index: number): void {
    for (let i = 0; i < this.tableHeader.length; i++) {
      if (i !== index)
        this.tableHeader[i].order = this.orderSymbols.default;
    }
  }

  constructor(public userService: UserService) {}

  ngOnInit() {}

}
