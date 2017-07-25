import { IUser, ISettings } from './user';
import { IFighter, ImprovedFighter, IImprovedFighter } from './fighter';

export interface IFight {
  player1: IUser;
  player2: IUser;
  settings: ISettings;
  initializeFight: (fighter: IFighter,
                    improvedFighter: IImprovedFighter,
                    points: number[]) => void;
}

export class Fight implements IFight {
  player1: IUser;
  player2: IUser;
  settings: ISettings;

  constructor(player1: IUser, player2: IUser, settings: ISettings) {
    this.player1 = player1;
    this.player2 = player2;
    this.settings = settings;
  }

  private _kick(pointIndex: number,
                fighters: any[],
                point: number,
                output: HTMLElement): boolean {
    // Switch indexes of the fighters to set an attacker
    let fIndex1: number = pointIndex % 2;
    let fIndex2: number = Math.abs(fIndex1 - 1);

    if (fighters[fIndex1] instanceof ImprovedFighter) {
      fighters[fIndex1].doubleHit(fighters[fIndex2], point);
    } else {
      fighters[fIndex1].hit(fighters[fIndex2], point);
    }

    // The battle stops if someone's health dropped to 0
    if (fighters[fIndex2].health == 0) {
      output.innerHTML += '<br><br>K.O.';
      output.innerHTML += `<br>${fighters[fIndex1].name} WINS!`;
      return false;
    } else {
      return true;
    }
  }

  initializeFight(fighter: IFighter,
                  improvedFighter: IImprovedFighter,
                  points: number[]) {
    const $outputElement = document.getElementById('battle-output') as HTMLElement;
    $outputElement.innerHTML = '';

    const announcement = `<br>GET READY FOR THE NEXT BATTLE!
                          <br>${fighter.name} VS ${improvedFighter.name}
                          <br>READY?
                          <br>FIGHT!
                          <br>`;
    const drawMessage: string =
      '<br><br>Unfortunately, fighters got tired and stopped fighting';

    // Randomly choose which fighter hits first
    let fIndex1: number = Math.floor((Math.random() * 2));

    // Set the sequence of the fighters
    let fightersList: IFighter|IImprovedFighter[] = [
      arguments[fIndex1],
      arguments[Math.abs(fIndex1 - 1)]
    ];

    $outputElement.innerHTML += announcement;

    // If no point was passed as argument, display the message about battle ending
    if (points.length == 0) {
      $outputElement.innerHTML += drawMessage;
    }

    for (let i = 0; i < points.length; i++) {
      let kick: boolean = this._kick(i, fightersList, points[i], $outputElement);

      if (!kick) {
        break;
      }

      /*
       In case the loop has gone through all points,
       display message about battle ending
       */
      if (i == points.length - 1) {
        $outputElement.innerHTML += drawMessage;
      }
    }
  }
}