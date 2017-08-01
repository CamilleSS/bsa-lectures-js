import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../app.component.css',
    './dashboard.component.css'
  ],
  providers: [UserService]
})

export class DashboardComponent implements OnInit {

  constructor(public router: Router, public userService: UserService) {}

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnInit() {}

}
