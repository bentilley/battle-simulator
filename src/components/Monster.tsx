/*
 * Monster.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { Combatant } from "./Combatant";
import { useBattle, useBattleActions } from "../model/Battle";

export const Monster: React.FC = () => {
  const {
    getMonster,
    getMonsterText,
    getMonsterDice,
    getBattleState,
  } = useBattle();
  const { setBattleState } = useBattleActions();

  const combatantActions = {};

  const monster = getMonster();
  if (getBattleState() == "ATTACK_RESOLVING" && monster.health <= 0) {
    setBattleState("WON");
  }

  return (
    <Combatant
      align={"right"}
      combatant={monster}
      messageText={getMonsterText()}
      dice={getMonsterDice()}
      combatantActions={combatantActions}
    />
  );
};
