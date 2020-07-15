export interface Combatant {
  name: string;
  health: number;
  maxHealth: number;
  lastDamage: number;
  img: string;
}

export interface Messages {
  text: string;
  dice: Dice;
  combatActions: CombatActions;
}

export interface CombatActions {
  [actionName: string]: { action: () => void; name: string };
}

export interface Dice {
  value: [number, number];
  areRolling: boolean;
}
