/*
 * Messages.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { CombatActions } from "../../model/Battle";

interface Props {
  text: string;
  combatantActions: CombatActions;
}

export const Messages: React.FC<Props> = ({ text, combatantActions }) => (
  <div className="combatant__messages">
    <p>{text}</p>
    <div className="combatant__messages_actions">
      {Object.entries(combatantActions).map(([key, value]) => (
        <Action name={value.name} onActivate={value.action} key={key} />
      ))}
    </div>
  </div>
);

interface ActionProps {
  name: string;
  onActivate: () => void;
}

const Action: React.FC<ActionProps> = ({ name, onActivate }) => {
  return (
    <div className="combatant__messages_action" onClick={onActivate}>
      <div className="combatant__messages_selector"></div>
      <p>{name}</p>
    </div>
  );
};
