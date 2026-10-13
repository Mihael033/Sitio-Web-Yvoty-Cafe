import React from "react";
import { Composition } from "remotion";
import { VIDEO } from "./brand/theme";
import { YvotyReel } from "./YvotyReel";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="YvotyReel"
      component={YvotyReel}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
  );
};
