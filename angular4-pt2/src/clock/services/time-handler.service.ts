import { Injectable } from '@angular/core';

@Injectable()
export class TimeHandlerService {

  getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hoursToDisplay = this.addZero(hours);
    const minutesToDisplay = this.addZero(minutes);
    const secondsToDisplay = this.addZero(seconds);

    const time = {
      hours: hoursToDisplay,
      minutes: minutesToDisplay,
      seconds: secondsToDisplay
    };

    return time;
  }

  addZero(amount: number | string): number | string {
    amount = amount > 9 ? amount : '0' + amount;
    return amount;
  }

}
