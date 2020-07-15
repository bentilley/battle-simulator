/*
 * Title.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";

interface Props {
  name: string;
}

export const Title: React.FC<Props> = ({ name }) => (
  <div className={`combatant__title`}>
    <h1>{name}</h1>
  </div>
);
