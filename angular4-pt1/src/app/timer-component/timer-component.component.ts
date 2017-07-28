import { Component, OnInit } from '@angular/core';
import { ConvertationService } from '../services/convertation.service';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer-component.component.html',
  styleUrls: ['./timer-component.component.css'],
  providers: [ConvertationService]
})

export class TimerComponentComponent implements OnInit {

  constructor(public convertationService: ConvertationService) {}
  mainButtonValue = 'Start';
  mainButtonDisabled = true;
  duration = 0;
  remainderOutput = {
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000'
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
      this.duration = this.convertationService.convertToMilliseconds(duration);
      let output = this.convertationService.makeOutput(this.duration);
      this.remainderOutput = output.durationOutput;
      this.duration = output.duration;

      this.timerInterval = setInterval(() => {
        output = this.convertationService.makeOutput(this.duration);
        this.remainderOutput = output.durationOutput;
        this.duration -= 10;
      }, 10);

      this.mainButtonValue = 'Pause';

    } else if (this.mainButtonValue === 'Pause') {
      const output = this.convertationService.makeOutput(this.duration);
      this.remainderOutput = output.durationOutput;
      this.duration = output.duration;

      clearInterval(this.timerInterval);
      this.mainButtonValue = 'Continue';

    } else if (this.mainButtonValue === 'Continue') {
      this.timerInterval = setInterval(() => {
        const output = this.convertationService.makeOutput(this.duration);
        this.remainderOutput = output.durationOutput;
        this.duration -= 10;
      }, 10);

      this.mainButtonValue = 'Pause';
    }
  }

  onResetButtonClick(): void {
    clearInterval(this.timerInterval);
    this.mainButtonValue = 'Start';
    this.duration = 0;
    this.remainderOutput = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    };
  }

  ngOnInit(): void {}
}
