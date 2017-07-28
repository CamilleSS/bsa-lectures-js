import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
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
