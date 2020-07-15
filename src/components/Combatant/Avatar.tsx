/*
 * Avatar.tsx
 * Copyright (C) 2020 Ben Tilley <targansaikhan@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";

interface Props {
  img_url: string;
}

export const Avatar: React.FC<Props> = ({ img_url }) => (
  <div className="combatant__avatar">
    <div className="combatant__avatar_img_container">
      <img src={img_url} alt="character avatar" />
    </div>
    <div className="combatant__avatar_base"></div>
  </div>
);
