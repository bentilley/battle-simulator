/*
 * Overlay.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import "./Overlay.scss";
import { useBattle } from "../../model/Battle";

export const Overlay: React.FC = () => {
  const { getBattleState, isBattleFinished } = useBattle();
  let message: string, style: string;
  switch (getBattleState()) {
    case "WON":
      message = "Victory!";
      style = "win";
      break;
    case "LOST":
      message = "Failure!";
      style = "loss";
      break;
  }
  return isBattleFinished() ? (
    <div className={`overlay overlay--${style}`}>
      <p>{message}</p>
    </div>
  ) : null;
};
