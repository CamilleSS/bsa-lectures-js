import { Injectable } from '@angular/core';

@Injectable()
export class TimeHandlerService {

  getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const addZero = (amount) => {
      amount = amount > 9 ? amount : '0' + amount;
      return amount;
    };

    const hoursToDisplay = addZero(hours);
    const minutesToDisplay = addZero(minutes);
    const secondsToDisplay = addZero(seconds);
    const time = {
      hours: hoursToDisplay,
      minutes: minutesToDisplay,
      seconds: secondsToDisplay
    };

    return time;
  }
}
