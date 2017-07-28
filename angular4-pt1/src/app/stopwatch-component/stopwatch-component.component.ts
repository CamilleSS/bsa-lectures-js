import { Component, OnInit } from '@angular/core';
import { ConvertationService } from '../services/convertation.service';

@Component({
  selector: 'app-stopwatch-component',
  templateUrl: './stopwatch-component.component.html',
  styleUrls: ['./stopwatch-component.component.css'],
  providers: [ConvertationService]
})

export class StopwatchComponentComponent implements OnInit {

  constructor(public convertationService: ConvertationService) {}
  mainButtonValue = 'Start';
  lapButtonDisabled = true;
  duration = 0;
  lapDuration = 0;
  durationOutput = {
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000'
  };
  lapDurationOutput = {
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000'
  };
  stopwatchInterval;
  laps = [];
  avg = 0;
  avgOutput = '00:00:00:000';

  onMainButtonClick(): void {
    if (this.mainButtonValue === 'Start') {
      this.duration = this.convertationService.convertToMilliseconds(this.duration);

      this.stopwatchInterval = setInterval(() => {
        this.duration += 10;
        this.lapDuration += 10;
        this.handleOutput();
      }, 10);

      this.mainButtonValue = 'Pause';
      this.lapButtonDisabled = false;

    } else if (this.mainButtonValue === 'Pause') {
      clearInterval(this.stopwatchInterval);
      this.mainButtonValue = 'Continue';
      this.lapButtonDisabled = true;

    } else if (this.mainButtonValue === 'Continue') {
      this.stopwatchInterval = setInterval(() => {
        this.duration += 10;
        this.lapDuration += 10;
        this.handleOutput();
      }, 10);

      this.mainButtonValue = 'Pause';
      this.lapButtonDisabled = false;
    }
  }

  handleOutput(): void {
    this.durationOutput = this.convertationService.makeOutput(this.duration);
    this.lapDurationOutput = this.convertationService.makeOutput(this.lapDuration);
  }

  onLapButtonClick(): void {
    let prev, avg, betterThanPrev, worseThanPrev;
    const length = this.laps.length;

    if (length > 0) {
      let durationSum = 0;
      for (const lap of this.laps) {
        durationSum += lap.duration;
      }
      this.avg = (durationSum + this.lapDuration) / (length + 1);

      const avgOutputRaw = this.convertationService.makeOutput(this.avg);
      this.avgOutput = `${avgOutputRaw.hours}:${avgOutputRaw.minutes}:${avgOutputRaw.seconds}:${avgOutputRaw.milliseconds}`;
      if (length > 0) {
        prev = this.lapDuration - this.laps[0].duration;
      } else {
        prev = 0;
      }
      avg = this.lapDuration - this.avg;

    } else {
      prev = 0;
      avg = 0;
    }

    betterThanPrev = prev < 0;
    worseThanPrev = prev >= 0;

    const prevOutputRaw = this.convertationService.makeOutput(prev);
    let avgOutputRaw = this.convertationService.makeOutput(avg);
    const prevOutput = `${prevOutputRaw.hours}:${prevOutputRaw.minutes}:${prevOutputRaw.seconds}:${prevOutputRaw.milliseconds}`;
    let avgOutput = `${avgOutputRaw.hours}:${avgOutputRaw.minutes}:${avgOutputRaw.seconds}:${avgOutputRaw.milliseconds}`;

    const lapDurationOutputRaw = this.lapDurationOutput;
    const lapDurationOutput = `${lapDurationOutputRaw.hours}:${lapDurationOutputRaw.minutes}:${lapDurationOutputRaw.seconds}:${lapDurationOutputRaw.milliseconds}`;

    this.laps.unshift({
      duration: this.lapDuration,
      durationOutput: lapDurationOutput,
      prev,
      prevOutput,
      avg,
      avgOutput,
      betterThanPrev,
      worseThanPrev
    });

    for (const lap of this.laps) {
      lap.avg = lap.duration - this.avg;
      avgOutputRaw = this.convertationService.makeOutput(lap.avg);
      avgOutput = `${avgOutputRaw.hours}:${avgOutputRaw.minutes}:${avgOutputRaw.seconds}:${avgOutputRaw.milliseconds}`;
      lap.avgOutput = avgOutput;

      lap.betterThanAvg = lap.avg < 0;
      lap.worseThanAvg = lap.avg >= 0;
    }

    this.lapDuration = 0;
    this.lapDurationOutput = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    };
  }

  onResetButtonClick(): void {
    clearInterval(this.stopwatchInterval);
    this.mainButtonValue = 'Start';
    this.laps = [];
    this.duration = 0;
    this.lapDuration = 0;
    this.avg = 0;
    this.durationOutput = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    };
    this.lapDurationOutput = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    };
    this.avgOutput = '00:00:00:000';
  }

  ngOnInit(): void {}
}
