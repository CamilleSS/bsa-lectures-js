import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {

  makeOutput(duration) {
    duration -= 10;
    const days = Math.floor(duration / 1000 / 60 / 60 / 24);
    const hours = Math.floor(duration % (1000 * 60 * 60 * 24) / 1000 / 60 / 60);
    const minutes = Math.floor(duration % (1000 * 60 * 60) / 1000 / 60);
    const seconds = Math.floor(duration % (1000 * 60) / 1000);
    const milliseconds = Math.floor(duration % 1000);

    const hoursToDisplay = this.addZero(hours);
    const minutesToDisplay = this.addZero(minutes);
    const secondsToDisplay = this.addZero(seconds);
    const millisecondsToDisplay = this.addZero(milliseconds);

    const remainderOutput = {
      days: days.toString(),
      hours: hoursToDisplay,
      minutes: minutesToDisplay,
      seconds: secondsToDisplay,
      milliseconds: millisecondsToDisplay
    };
    return {duration, remainderOutput};
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
