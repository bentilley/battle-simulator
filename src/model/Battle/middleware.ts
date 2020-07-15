import React, { Dispatch } from "react";

import { Action } from "./actions";
import { getRandomDiceRoll, sumRoll } from "../../utils";

export const useMiddleware = (dispatch: Dispatch<Action>): Dispatch<Action> => {
  const enhancedDispatch = React.useMemo(() => getWrappedDispatch(dispatch), [
    dispatch,
  ]);
  return enhancedDispatch;
};

const getWrappedDispatch = (dispatch: Dispatch<Action>) => {
  const enhancedDispatch = async (action: Action) => {
    const value = dispatch(action);
    switch (action.type) {
      case "ROLL_DICE":
        startDiceRolling(dispatch);
        setTimeout(() => stopDiceRolling(dispatch), 1000);
        break;
      default:
        return value;
    }
    return value;
  };
  return enhancedDispatch;
};

const startDiceRolling = async (dispatch: Dispatch<Action>): Promise<void> => {
  dispatch({ type: "SET_PLAYER_DICE_ARE_ROLLING", payload: true });
  dispatch({ type: "SET_MONSTER_DICE_ARE_ROLLING", payload: true });

  const playerRoll = getRandomDiceRoll();
  const monsterRoll = getRandomDiceRoll();
  dispatch({ type: "SET_PLAYER_DICE", payload: playerRoll });
  dispatch({ type: "SET_MONSTER_DICE", payload: monsterRoll });

  const difference = sumRoll(playerRoll) - sumRoll(monsterRoll);
  dispatch({ type: "SET_GLOBAL_LAST_DAMAGE", payload: difference });

  if (difference > 0) {
    dispatch({ type: "DECR_MONSTER_HEALTH", payload: difference });
  } else if (difference < 0) {
    dispatch({ type: "DECR_PLAYER_HEALTH", payload: -difference });
  }
};

const stopDiceRolling = async (dispatch: Dispatch<Action>): Promise<void> => {
  dispatch({ type: "SET_PLAYER_DICE_ARE_ROLLING", payload: false });
  dispatch({ type: "SET_MONSTER_DICE_ARE_ROLLING", payload: false });
  dispatch({ type: "SET_BATTLE_STATE", payload: "ATTACK_RESOLVING" });
  setTimeout(() => {
    dispatch({ type: "SET_BATTLE_STATE", payload: "WAITING" });
    dispatch({ type: "SET_PLAYER_LAST_DAMAGE", payload: 0 });
    dispatch({ type: "SET_MONSTER_LAST_DAMAGE", payload: 0 });
  }, 1500);
};
