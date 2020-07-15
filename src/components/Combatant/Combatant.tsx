/*
 * Combatant.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import "./Combatant.scss";

import { Title } from "./Title";
import { Avatar } from "./Avatar";
import { HealthBar } from "./HealthBar";
import { Messages } from "./Messages";
import { CombatantDice } from "./Dice";
import { Combatant, CombatActions, Dice } from "../../model/Battle";

interface Props {
  align: "left" | "right";
  combatant: Combatant;
  messageText: string;
  dice: Dice;
  combatantActions: CombatActions;
}

export const CombatantUI: React.FC<Props> = ({
  align,
  combatant,
  messageText,
  dice,
  combatantActions,
}) => (
  <div className={`combatant combatant--${align}`}>
    <Title name={combatant.name} />
    <Avatar img_url={combatant.img} />
    <HealthBar
      health={combatant.health}
      maxHealth={combatant.maxHealth}
      damage={combatant.lastDamage}
    />
    <div className="combatant__action_panel">
      <Messages text={messageText} combatantActions={combatantActions} />
      <CombatantDice dice={dice} />
    </div>
  </div>
);
