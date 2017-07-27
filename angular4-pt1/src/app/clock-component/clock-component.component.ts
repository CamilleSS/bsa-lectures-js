import { Component, OnInit } from '@angular/core';
import { TimeHandlerService } from '../services/time-handler.service';

@Component({
  selector: 'app-clock-component',
  templateUrl: './clock-component.component.html',
  styleUrls: ['./clock-component.component.css'],
  providers: [TimeHandlerService]
})

export class ClockComponentComponent implements OnInit {

  constructor(public timeHandlerService: TimeHandlerService) {}
  time = this.timeHandlerService.getTime();

  ngOnInit(): void {
    setInterval(() => {
      this.time = this.timeHandlerService.getTime();
    }, 1000);
  }
}
