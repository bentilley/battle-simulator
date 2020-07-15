import React from "react";
import { State, BattleStates } from "./reducer";
import { Combatant, Dice } from "./types";

export type Selectors = {
  getPlayer: () => Combatant;
  getPlayerText: () => string;
  getPlayerDice: () => Dice;
  getMonster: () => Combatant;
  getMonsterText: () => string;
  getMonsterDice: () => Dice;
  areDiceRolling: () => boolean;
  getBattleState: () => BattleStates;
  getGlobalLastDamage: () => number;
  isBattleFinished: () => boolean;
};

export const useSelectors = (state: State): Selectors => {
  return React.useMemo(
    () => ({
      getPlayer: () => state.player,
      getPlayerText: () => state.playerMessages.text,
      getPlayerDice: () => state.playerMessages.dice,
      getMonster: () => state.monster,
      getMonsterText: () => state.monsterMessages.text,
      getMonsterDice: () => state.monsterMessages.dice,
      areDiceRolling: () =>
        state.playerMessages.dice.areRolling ||
        state.monsterMessages.dice.areRolling,
      getBattleState: () => state.battle.state,
      getGlobalLastDamage: () => state.battle.lastAttackDamage,
      isBattleFinished: () =>
        state.battle.state == "WON" || state.battle.state == "LOST",
    }),
    [state]
  );
};
