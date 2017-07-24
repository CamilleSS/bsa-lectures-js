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