/*
 * context.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { initialState, reducer } from "./reducer";
import { useActions } from "./actions";
import { useSelectors } from "./selectors";
import { useMiddleware } from "./middleware";

import { Selectors } from "./selectors";
import { ActionHandlers } from "./actions";
import { checkIfInvalidContext } from "../../utils";

const BattleStateContext = React.createContext<Selectors | null>(null);
const BattleActionsContext = React.createContext<ActionHandlers | null>(null);

export const BattleProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectors = useSelectors(state);
  const enhancedDispatch = useMiddleware(dispatch);
  const actions = useActions(state, enhancedDispatch);

  return (
    <BattleStateContext.Provider value={selectors}>
      <BattleActionsContext.Provider value={actions}>
        {children}
      </BattleActionsContext.Provider>
    </BattleStateContext.Provider>
  );
};

export const useBattle = (): Selectors => {
  const context = React.useContext<Selectors | null>(BattleStateContext);
  checkIfInvalidContext<Selectors>(context);
  return context as Selectors;
};

export const useBattleActions = (): ActionHandlers => {
  const context = React.useContext<ActionHandlers | null>(BattleActionsContext);
  checkIfInvalidContext<ActionHandlers>(context);
  return context as ActionHandlers;
};
