import { Action } from "./actions";
import { Combatant, Messages } from "./types";

export type BattleStates =
  | "WAITING"
  | "ATTACK_IN_PROGRESS"
  | "ATTACK_RESOLVING"
  | "WON"
  | "LOST";

interface Battle {
  state: BattleStates;
  lastAttackDamage: number;
}

export type State = {
  battle: Battle;
  player: Combatant;
  monster: Combatant;
  playerMessages: Messages;
  monsterMessages: Messages;
};

export const initialState: State = {
  battle: { state: "WAITING", lastAttackDamage: 0 },
  player: {
    name: "Ben",
    health: 100,
    maxHealth: 100,
    lastDamage: 0,
    img: "ninja.svg",
  },
  monster: {
    name: "Monster",
    health: 100,
    maxHealth: 100,
    lastDamage: 0,
    img: "monster.svg",
  },
  playerMessages: {
    dice: { value: [1, 1], areRolling: false },
    text: "Noble warrior, what would you like to do?",
    combatActions: {},
  },
  monsterMessages: {
    dice: { value: [1, 1], areRolling: false },
    text: "A fierce monster, fouler than anything you have seen before.",
    combatActions: {},
  },
};

export const reducer = (state: State, action: Action): State => {
  return {
    battle: battleStateReducer(state.battle, action),
    player: playerReducer(state.player, action),
    monster: monsterReducer(state.monster, action),
    playerMessages: playerMessagesReducer(state.playerMessages, action),
    monsterMessages: monsterMessagesReducer(state.monsterMessages, action),
  };
};

const battleStateReducer = (battleState: Battle, action: Action): Battle => {
  switch (action.type) {
    case "SET_BATTLE_STATE":
      if (battleState.state === "WON" || battleState.state === "LOST") {
        return battleState;
      } else {
        return { ...battleState, state: action.payload };
      }
    case "SET_GLOBAL_LAST_DAMAGE":
      return { ...battleState, lastAttackDamage: action.payload };
    default:
      return battleState;
  }
};

const playerReducer = (playerState: Combatant, action: Action): Combatant => {
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return { ...playerState, name: action.payload };
    case "SET_PLAYER_HEALTH":
      return { ...playerState, health: action.payload };
    case "SET_PLAYER_LAST_DAMAGE":
      return { ...playerState, lastDamage: action.payload };
    case "DECR_PLAYER_HEALTH":
      return {
        ...playerState,
        health: Math.max(playerState.health - action.payload, 0),
        lastDamage:
          action.payload <= playerState.health
            ? action.payload
            : playerState.health,
      };
    default:
      return playerState;
  }
};

const monsterReducer = (monsterState: Combatant, action: Action): Combatant => {
  switch (action.type) {
    case "SET_MONSTER_NAME":
      return { ...monsterState, name: action.payload };
    case "SET_MONSTER_HEALTH":
      return { ...monsterState, health: action.payload };
    case "SET_MONSTER_LAST_DAMAGE":
      return { ...monsterState, lastDamage: action.payload };
    case "DECR_MONSTER_HEALTH":
      return {
        ...monsterState,
        health: Math.max(monsterState.health - action.payload, 0),
        lastDamage:
          action.payload <= monsterState.health
            ? action.payload
            : monsterState.health,
      };
    default:
      return monsterState;
  }
};

const playerMessagesReducer = (
  playerMessagesState: Messages,
  action: Action
): Messages => {
  switch (action.type) {
    case "SET_PLAYER_TEXT":
      return { ...playerMessagesState, text: action.payload };
    case "SET_PLAYER_DICE":
      return {
        ...playerMessagesState,
        dice: { ...playerMessagesState.dice, value: action.payload },
      };
    case "SET_PLAYER_DICE_ARE_ROLLING":
      return {
        ...playerMessagesState,
        dice: { ...playerMessagesState.dice, areRolling: action.payload },
      };
    default:
      return playerMessagesState;
  }
};

const monsterMessagesReducer = (
  monsterMessagesState: Messages,
  action: Action
): Messages => {
  switch (action.type) {
    case "SET_MONSTER_TEXT":
      return { ...monsterMessagesState, text: action.payload };
    case "SET_MONSTER_DICE":
      return {
        ...monsterMessagesState,
        dice: { ...monsterMessagesState.dice, value: action.payload },
      };
    case "SET_MONSTER_DICE_ARE_ROLLING":
      return {
        ...monsterMessagesState,
        dice: { ...monsterMessagesState.dice, areRolling: action.payload },
      };
    default:
      return monsterMessagesState;
  }
};
