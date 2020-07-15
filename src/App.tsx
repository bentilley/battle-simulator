/*
 * App.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import { hot } from "react-hot-loader";
import { Container, Separator, Player, Monster, Overlay } from "./components";
import { BattleProvider } from "./model/Battle";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <BattleProvider>
        <Container>
          <Player />
          <Separator />
          <Monster />
        </Container>
        <Overlay />
      </BattleProvider>
    </div>
  );
};

/* const BattleUI = () => { */
/*   return ( */
/*     <Container> */
/*       <Player /> */
/*       <Separator name="gap" /> */
/*       <Monster /> */
/*     </Container> */
/*   ); */
/* }; */

export default hot(module)(App);
