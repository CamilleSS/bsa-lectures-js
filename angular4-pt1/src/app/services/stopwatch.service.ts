import { Injectable } from '@angular/core';

@Injectable()
export class StopwatchService {

  makeOutput(duration) {
    const absDuration = Math.abs(duration);
    const hours = Math.floor(absDuration % (1000 * 60 * 60 * 24) / 1000 / 60 / 60);
    const minutes = Math.floor(absDuration % (1000 * 60 * 60) / 1000 / 60);
    const seconds = Math.floor(absDuration % (1000 * 60) / 1000);
    const milliseconds = Math.floor(absDuration % 1000);

    let hoursToDisplay = this.addZero(hours);
    hoursToDisplay = duration > 0 ? hoursToDisplay : '-' + hoursToDisplay;
    const minutesToDisplay = this.addZero(minutes);
    const secondsToDisplay = this.addZero(seconds);

    const durationOutput = {
      hours: hoursToDisplay,
      minutes: minutesToDisplay,
      seconds: secondsToDisplay,
      milliseconds: milliseconds.toString()
    };
    return {duration, durationOutput};
  }

  convertToMilliseconds(duration) {
    duration = Number(duration);
    const milliseconds = Math.floor(duration * 60 * 1000);
    return milliseconds;
  }

  addZero(amount) {
    amount = amount > 9 ? amount : '0' + amount;
    return amount.toString();
  }
}
