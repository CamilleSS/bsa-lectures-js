import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer-component.component.html',
  styleUrls: ['./timer-component.component.css'],
  providers: [TimerService]
})

export class TimerComponentComponent implements OnInit {

  constructor(public timerService: TimerService) {}
  mainButtonValue = 'Start';
  mainButtonDisabled = true;
  duration = 0;
  remainderOutput = {
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '00'
  };
  timerInterval;

  activateButtons(event: any): void {
    if (parseFloat(event.target.value).toString() !== 'NaN') {
      this.mainButtonDisabled = false;
    } else {
      this.mainButtonDisabled = true;
    }
  }

  onMainButtonClick(duration): void {
    if (this.mainButtonValue === 'Start') {
      this.duration = this.timerService.convertToMilliseconds(duration);
      let output = this.timerService.makeOutput(this.duration);
      this.remainderOutput = output.remainderOutput;
      this.duration = output.duration;

      this.timerInterval = setInterval(() => {
        output = this.timerService.makeOutput(this.duration);
        this.remainderOutput = output.remainderOutput;
        this.duration = output.duration;
      }, 10);

      this.mainButtonValue = 'Pause';

    } else if (this.mainButtonValue === 'Pause') {
      const output = this.timerService.makeOutput(this.duration);
      this.remainderOutput = output.remainderOutput;
      this.duration = output.duration;

      clearInterval(this.timerInterval);
      this.mainButtonValue = 'Continue';

    } else if (this.mainButtonValue === 'Continue') {
      this.timerInterval = setInterval(() => {
        const output = this.timerService.makeOutput(this.duration);
        this.remainderOutput = output.remainderOutput;
        this.duration = output.duration;
      }, 10);

      this.mainButtonValue = 'Pause';
    }
  }

  onResetButtonClick(): void {
    clearInterval(this.timerInterval);
    this.mainButtonValue = 'Start';
    this.duration = 0;
    this.remainderOutput = {
      days: '0',
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '00'
    };
  }

  ngOnInit(): void {
  }

}
