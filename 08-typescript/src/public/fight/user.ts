export interface IUser {
  name: HTMLInputElement;
  power: HTMLInputElement;
  health: HTMLInputElement;
}

export interface ISettings {
  points: HTMLInputElement;
  start: HTMLButtonElement;
}

export class User implements IUser {
  name: HTMLInputElement;
  power: HTMLInputElement;
  health: HTMLInputElement;

  constructor(name: HTMLInputElement,
              power: HTMLInputElement,
              health: HTMLInputElement) {
    this.name = name;
    this.power = power;
    this.health = health;
  }
}

export class Settings implements ISettings {
  points: HTMLInputElement;
  start: HTMLButtonElement;

  constructor(points: HTMLInputElement, start: HTMLButtonElement) {
    this.points = points;
    this.start = start;
  }
}