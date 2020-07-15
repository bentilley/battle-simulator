/*
 * Player.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { Combatant } from "./Combatant";
import { useBattle, useBattleActions } from "../model/Battle";

export const Player: React.FC = () => {
  const {
    getPlayer,
    getPlayerText,
    getPlayerDice,
    getBattleState,
  } = useBattle();
  const { playerAttack, setBattleState } = useBattleActions();

  let combatantActions;
  if (getBattleState() == "WAITING") {
    combatantActions = { attack: { name: "Attack", action: playerAttack } };
  } else {
    combatantActions = {};
  }

  const player = getPlayer();
  if (getBattleState() == "ATTACK_RESOLVING" && player.health <= 0) {
    setBattleState("LOST");
  }

  return (
    <Combatant
      align={"left"}
      combatant={player}
      messageText={getPlayerText()}
      dice={getPlayerDice()}
      combatantActions={combatantActions}
    />
  );
};
