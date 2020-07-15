/*
 * HealthBar.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { useBattle } from "../../model/Battle";

interface Props {
  health: number;
  maxHealth: number;
  damage: number;
}

export const HealthBar: React.FC<Props> = ({ health, maxHealth, damage }) => {
  const { getBattleState, isBattleFinished } = useBattle();
  const [localHealth, setLocalHealth] = React.useState(health);
  const [localHealthFraction, setLocalHealthFraction] = React.useState(health);
  const [localDamage, setLocalDamage] = React.useState(damage);

  React.useEffect(() => {
    const battleState = getBattleState();
    if (battleState == "ATTACK_RESOLVING") {
      setLocalDamage(damage);
      setLocalHealthFraction(health);
    } else if (battleState == "WAITING") {
      setLocalHealth(health);
    }
  }, [getBattleState, health, damage, setLocalHealth, setLocalDamage]);

  return (
    <div className="combatant__health">
      <div className="combatant__health_bar">
        <p>HP:</p>
        <div className="combatant__health_bar_bg">
          <div
            className="combatant__health_bar_fg"
            style={{ width: `${(100 * localHealth) / maxHealth}%` }}
          >
            {isBattleFinished() ||
            (getBattleState() == "ATTACK_RESOLVING" && localDamage > 0) ? (
              <div
                className="combatant__health_bar_damage"
                style={{
                  width: `${(100 * localDamage) / localHealth}%`,
                }}
              >
                <p className="combatant__health_bar_damage_number">
                  {localDamage}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <p className="combatant__health_fraction">
        {localHealthFraction} / {maxHealth}
      </p>
    </div>
  );
};
