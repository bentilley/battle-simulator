/*
 * Container.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import "./Container.scss";

export const Container: React.FC = ({ children }) => (
  <div className="bs-container">
    <div className="border">
      <div className="title">
        <h1>Battle Simulator</h1>
      </div>
      <div className="contents">{children}</div>
    </div>
  </div>
);
