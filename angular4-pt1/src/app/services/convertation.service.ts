import { Injectable } from '@angular/core';

@Injectable()
export class ConvertationService {

  makeOutput(duration: number) {
    const absDuration = Math.abs(duration);
    const hours = Math.floor(absDuration % (1000 * 60 * 60 * 24) / 1000 / 60 / 60);
    const minutes = Math.floor(absDuration % (1000 * 60 * 60) / 1000 / 60);
    const seconds = Math.floor(absDuration % (1000 * 60) / 1000);
    let milliseconds: number | string = Math.floor(absDuration % 1000);

    let hoursToDisplay = this.addZero(hours);
    hoursToDisplay = duration > 0 ? hoursToDisplay : '-' + hoursToDisplay;
    const minutesToDisplay = this.addZero(minutes);
    const secondsToDisplay = this.addZero(seconds);
    milliseconds = milliseconds > 99 ? milliseconds : '0' + milliseconds;
    const millisecondsToDisplay = milliseconds.toString();

    const durationOutput = {
      hours: hoursToDisplay,
      minutes: minutesToDisplay,
      seconds: secondsToDisplay,
      milliseconds: millisecondsToDisplay
    };
    return durationOutput;
  }

  convertToMilliseconds(duration: string | number): number {
    duration = Number(duration);
    const milliseconds = Math.floor(duration * 60 * 1000);
    return milliseconds;
  }

  addZero(amount: number | string): string {
    amount = amount > 9 ? amount : '0' + amount;
    return amount.toString();
  }
}
