/*
 * Dice.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { Dice } from "../../model/Battle";
import { useBattle } from "../../model/Battle";
import { getRandomDiceRoll } from "../../utils";

interface Props {
  dice: Dice;
}

export const CombatantDice: React.FC<Props> = ({ dice }) => {
  const { areDiceRolling } = useBattle();
  return areDiceRolling() ? <RandomDice /> : <DiceUI value={dice.value} />;
};

const RandomDice: React.FC = () => {
  const [diceValue, setDiceValue] = React.useState([1, 1]);

  React.useEffect(() => {
    const randomRollInterval = setInterval(
      () => setDiceValue(getRandomDiceRoll()),
      100
    );
    return () => clearInterval(randomRollInterval);
  }, [setDiceValue, getRandomDiceRoll]);

  return <DiceUI value={diceValue as [number, number]} />;
};

interface DiceUIProps {
  value: [number, number];
}

const DiceUI: React.FC<DiceUIProps> = ({ value }) => {
  return (
    <div className="combatant__dice">
      <div className="combatant__die">
        <span className={`dice dice-${value[0]}`}></span>
      </div>
      <div className="combatant__die">
        <span className={`dice dice-${value[1]}`}></span>
      </div>
    </div>
  );
};
