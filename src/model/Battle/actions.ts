import React from "react";
import { State, BattleStates } from "./reducer";

export type Action =
  | BattleStateAction
  | PlayerAction
  | MonsterAction
  | DiceAction;

type BattleStateAction =
  | { type: "SET_BATTLE_STATE"; payload: BattleStates }
  | { type: "SET_GLOBAL_LAST_DAMAGE"; payload: number };

type PlayerAction =
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_PLAYER_HEALTH"; payload: number }
  | { type: "SET_PLAYER_LAST_DAMAGE"; payload: number }
  | { type: "DECR_PLAYER_HEALTH"; payload: number }
  | { type: "SET_PLAYER_TEXT"; payload: string }
  | { type: "PLAYER_ATTACK" };

type MonsterAction =
  | { type: "SET_MONSTER_NAME"; payload: string }
  | { type: "SET_MONSTER_HEALTH"; payload: number }
  | { type: "SET_MONSTER_LAST_DAMAGE"; payload: number }
  | { type: "DECR_MONSTER_HEALTH"; payload: number }
  | { type: "SET_MONSTER_TEXT"; payload: string };

type DiceAction =
  | { type: "ROLL_DICE" }
  | { type: "SET_PLAYER_DICE_ARE_ROLLING"; payload: boolean }
  | { type: "SET_MONSTER_DICE_ARE_ROLLING"; payload: boolean }
  | { type: "SET_PLAYER_DICE"; payload: [number, number] }
  | { type: "SET_MONSTER_DICE"; payload: [number, number] };

export type ActionHandlers = {
  setPlayerName: (name: string) => void;
  setPlayerHealth: (name: number) => void;
  setMonsterName: (name: string) => void;
  setMonsterHealth: (name: number) => void;
  setPlayerText: (name: string) => void;
  setMonsterText: (name: string) => void;
  setBattleState: (state: BattleStates) => void;
  playerAttack: () => void;
  resolveCombat: () => void;
};

export const useActions = (
  state: State,
  dispatch: React.Dispatch<Action>
): ActionHandlers => {
  return {
    setPlayerName: React.useMemo(
      () => (name: string) => {
        dispatch({ type: "SET_PLAYER_NAME", payload: name });
      },
      [dispatch]
    ),
    setPlayerHealth: React.useMemo(
      () => (health: number) => {
        dispatch({ type: "SET_PLAYER_HEALTH", payload: health });
      },
      [dispatch]
    ),
    setMonsterName: React.useMemo(
      () => (name: string) => {
        dispatch({ type: "SET_MONSTER_NAME", payload: name });
      },
      [dispatch]
    ),
    setMonsterHealth: React.useMemo(
      () => (health: number) => {
        dispatch({ type: "SET_MONSTER_HEALTH", payload: health });
      },
      [dispatch]
    ),
    setPlayerText: React.useMemo(
      () => (text: string) => {
        dispatch({ type: "SET_PLAYER_TEXT", payload: text });
      },
      [dispatch]
    ),
    setMonsterText: React.useMemo(
      () => (text: string) => {
        dispatch({ type: "SET_MONSTER_TEXT", payload: text });
      },
      [dispatch]
    ),
    setBattleState: React.useMemo(
      () => (state: BattleStates) => {
        dispatch({ type: "SET_BATTLE_STATE", payload: state });
      },
      [dispatch]
    ),
    playerAttack: React.useMemo(
      () => () => {
        dispatch({ type: "ROLL_DICE" });
        dispatch({ type: "SET_BATTLE_STATE", payload: "ATTACK_IN_PROGRESS" });
      },
      [dispatch]
    ),
    resolveCombat: React.useMemo(
      () => () => {
        const playerRoll = state.playerMessages.dice.value.reduce(
          (a, b) => a + b,
          0
        );
        const monsterRoll = state.monsterMessages.dice.value.reduce(
          (a, b) => a + b,
          0
        );
        const rollDifference = playerRoll - monsterRoll;
        console.log(`You did ${rollDifference} damage`);
      },
      [dispatch]
    ),
  };
};
