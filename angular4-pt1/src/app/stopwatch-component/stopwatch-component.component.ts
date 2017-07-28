import { Component, OnInit } from '@angular/core';
import { StopwatchService } from '../services/stopwatch.service';

@Component({
  selector: 'app-stopwatch-component',
  templateUrl: './stopwatch-component.component.html',
  styleUrls: ['./stopwatch-component.component.css'],
  providers: [StopwatchService]
})
export class StopwatchComponentComponent implements OnInit {

  constructor(public stopwatchService: StopwatchService) {}
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
  timerInterval;
  laps = [];
  avg = 0;
  avgOutput = {
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000'
  };

  onMainButtonClick(): void {
    if (this.mainButtonValue === 'Start') {
      this.duration = this.stopwatchService.convertToMilliseconds(this.duration);
      this.handleOutput();

      this.timerInterval = setInterval(() => {
        this.handleOutput();
        this.duration += 10;
        this.lapDuration += 10;
      }, 10);

      this.mainButtonValue = 'Pause';
      this.lapButtonDisabled = false;

    } else if (this.mainButtonValue === 'Pause') {
      this.handleOutput();

      clearInterval(this.timerInterval);
      this.mainButtonValue = 'Continue';
      this.lapButtonDisabled = true;

    } else if (this.mainButtonValue === 'Continue') {
      this.timerInterval = setInterval(() => {
        this.handleOutput();
        this.duration += 10;
        this.lapDuration += 10;
      }, 10);

      this.mainButtonValue = 'Pause';
      this.lapButtonDisabled = false;
    }
  }

  handleOutput(): void {
    const output = this.stopwatchService.makeOutput(this.duration);
    const lapOutput = this.stopwatchService.makeOutput(this.lapDuration);
    this.durationOutput = output.durationOutput;
    this.lapDurationOutput = lapOutput.durationOutput;
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
      this.avgOutput = this.stopwatchService.makeOutput(this.avg).durationOutput;
      prev = this.lapDuration - this.laps[length - 1].duration;
      avg = this.lapDuration - this.avg;
    } else {
      prev = 0;
      avg = 0;
    }

    if (prev < 0) {
      betterThanPrev = true;
      worseThanPrev = false;
    } else {
      betterThanPrev = false;
      worseThanPrev = true;
    }

    const prevOutputRaw = this.stopwatchService.makeOutput(prev).durationOutput;
    let avgOutputRaw = this.stopwatchService.makeOutput(avg).durationOutput;
    const prevOutput = `${prevOutputRaw.hours}:${prevOutputRaw.minutes}:${prevOutputRaw.seconds}:${prevOutputRaw.milliseconds}`;
    let avgOutput = `${avgOutputRaw.hours}:${avgOutputRaw.minutes}:${avgOutputRaw.seconds}:${avgOutputRaw.milliseconds}`;

    this.laps.push({
      duration: this.lapDuration,
      durationOutput: this.lapDurationOutput,
      prev,
      prevOutput,
      avg,
      avgOutput,
      betterThanPrev,
      worseThanPrev
    });

    for (const lap of this.laps) {
      lap.avg = lap.duration - this.avg;
      avgOutputRaw = this.stopwatchService.makeOutput(lap.avg).durationOutput;
      avgOutput = `${avgOutputRaw.hours}:${avgOutputRaw.minutes}:${avgOutputRaw.seconds}:${avgOutputRaw.milliseconds}`;
      lap.avgOutput = avgOutput;

      if (lap.avg < 0) {
        lap.betterThanAvg = true;
        lap.worseThanAvg = false;
      } else {
        lap.betterThanAvg = false;
        lap.worseThanAvg = true;
      }
    }

    this.lapDuration = 0;
    this.lapDurationOutput = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    };
    console.log(this.laps);
  }

  onResetButtonClick(): void {
    clearInterval(this.timerInterval);
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
    this.avgOutput = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      milliseconds: '000'
    };
  }

  ngOnInit(): void {}
}
