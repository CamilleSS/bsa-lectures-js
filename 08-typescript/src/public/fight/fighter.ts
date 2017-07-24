export interface IFighter {
  name: string;
  power: number;
  health: number;
  setDamage: (damage: number) => void;
  hit: (enemy: IFighter | IImprovedFighter, point: number) => void;
}

export interface IImprovedFighter extends IFighter {
  doubleHit: (enemy: IFighter, point: number) => void;
}

export class Fighter implements IFighter {
  name: string;
  power: number;
  health: number;

  constructor(name: string, power: number, health: number){
    this.name = name;
    this.power = power;
    this.health = health;
  };

  setDamage(damage: number) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
    $outputElement.innerHTML += `<br>${this.name}'s health: ${this.health} HP`;
  }

  hit(enemy: IFighter | IImprovedFighter, point: number) {
    let damage: number = point * this.power;
    $outputElement.innerHTML +=
      `<br>${this.name} HITS ${enemy.name}: -${damage} HP!`;
    enemy.setDamage(damage);
  }
}

export class ImprovedFighter extends Fighter implements IImprovedFighter {
  constructor(name: string, power: number, health: number) {
    super(name, power, health);
  }

  doubleHit(enemy: IFighter, point: number) {
    super.hit(enemy, point * 2);
  }
}

const $outputElement: HTMLElement =
  document.getElementById('battle-output') as HTMLElement;