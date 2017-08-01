import { Component, OnInit } from '@angular/core';
import { TimeHandlerService } from '../services/time-handler.service';

@Component({
  selector: 'app-clock-main-component',
  templateUrl: './clock-main.component.html',
  styleUrls: ['./clock-main.component.css'],
  providers: [TimeHandlerService]
})

export class ClockMainComponent implements OnInit {

  modes = [
    {
      mode: 'clock',
      checked: true
    },
    {
      mode: 'timer',
      checked: false
    },
    {
      mode: 'stopwatch',
      checked: false
    }
  ];

  onModeChange(mode) {
    for (const entry of this.modes) {
      if (mode.mode === entry.mode) {
        entry.checked = true;
      } else {
        entry.checked = false;
      }
    }
  }

  ngOnInit(): void {}
}
