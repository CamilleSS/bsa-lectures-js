import '../styles/main.css';
import { Fight } from './fight/fight';
import { Fighter, ImprovedFighter } from './fight/fighter';
import { User, Settings } from './fight/user';

const player1 = new User(
  document.querySelector('#f1-inputs > .name') as HTMLInputElement,
  document.querySelector('#f1-inputs > .power') as HTMLInputElement,
  document.querySelector('#f1-inputs > .health') as HTMLInputElement
);

const player2 = new User(
  document.querySelector('#f2-inputs > .name') as HTMLInputElement,
  document.querySelector('#f2-inputs > .power') as HTMLInputElement,
  document.querySelector('#f2-inputs > .health') as HTMLInputElement
);

const settings = new Settings(
  document.querySelector('#set-points > input') as HTMLInputElement,
  document.querySelector('#start-fight > button') as HTMLButtonElement
);

let fight = new Fight(player1, player2, settings);

window.onload = () => {
  settings.start.addEventListener('click', () => {
    checkData(player1, player2);

    let fighter1 = new Fighter(
      player1.name.value,
      Number(player1.power.value),
      Number(player1.health.value)
    );

    let fighter2 = new ImprovedFighter(
      player2.name.value,
      Number(player2.power.value),
      Number(player2.health.value)
    );

    let points: number[] = [];
    let inputPoints: string[] = settings.points.value.split(',');
    inputPoints.forEach(point => {
      let numericPoint: number = Number(point);
      if (numericPoint > 0) {
        points.push(numericPoint)
      }
    });

    fight.initializeFight(fighter1, fighter2, points);
  });
};

// validate input data; if data is not valid, set default values
const checkData = (fighter1: User, fighter2: User) => {
  let nameValue1: string = fighter1.name.value ? fighter1.name.value : "Fighter1";
  let nameValue2: string = fighter2.name.value ? fighter2.name.value : "Fighter2";
  fighter1.name.value = nameValue1;
  fighter2.name.value = nameValue2;

  if (fighter1.power.value == '' || fighter1.power.value == "NaN") {fighter1.power.value = "20"}
  if (fighter1.health.value == '' || fighter1.health.value == "NaN") {fighter1.health.value = "1000"}
  if (fighter2.power.value == '' || fighter2.power.value == "NaN") {fighter2.power.value = "20"}
  if (fighter2.health.value == '' || fighter2.health.value == "NaN") {fighter2.health.value = "1000"}

  fighter1.power.value = Math.abs(Number(fighter1.power.value)).toString();
  fighter1.health.value = Math.abs(Number(fighter1.health.value)).toString();
  fighter2.power.value = Math.abs(Number(fighter2.power.value)).toString();
  fighter2.health.value = Math.abs(Number(fighter2.health.value)).toString();
};