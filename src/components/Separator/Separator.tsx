/*
 * Separator.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { useBattle } from "../../model/Battle";
import "./Separator.scss";

export const Separator: React.FC = () => {
  const { getBattleState, getGlobalLastDamage } = useBattle();
  const [isNewGame, setIsNewGame] = React.useState(true);

  React.useEffect(() => {
    if (isNewGame && getBattleState() != "WAITING") {
      setIsNewGame(false);
    }
  });

  let message: string;
  const globalLastDamage = getGlobalLastDamage();
  if (isNewGame) {
    message = "Click 'ATTACK!' to fight the monster";
  } else {
    switch (getBattleState()) {
      case "ATTACK_IN_PROGRESS":
        message = "Charge forth, for honour and glory!";
        break;
      case "WAITING":
      case "ATTACK_RESOLVING":
        if (globalLastDamage > 0) {
          message = `You hit the beast for ${globalLastDamage}!`;
        } else if (globalLastDamage < 0) {
          message = `You took ${-globalLastDamage}. Stay strong.`;
        } else {
          message = "You clashed together, but no damage was done.";
        }
        break;
    }
  }

  return (
    <div className="separator">
      <div className="separator__spacer"></div>
      <div className="separator__message">
        <p>{message}</p>
      </div>
    </div>
  );
};
