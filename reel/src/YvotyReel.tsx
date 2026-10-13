import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { VIDEO } from "./brand/theme";
import { photos } from "./photos.generated";
import { Scene } from "./scenes/Scene";
import { Closing } from "./scenes/Closing";
import { BeansIcon, CupIcon, LatteFlowerIcon, PinIcon, RoastIcon } from "./icons/Icons";

// Telas conforme brief/roteiro-reel.md
const scenes = [
  { text: "¿Ya tomaste tu café?", highlight: ["café"], icon: <CupIcon /> },
  { text: "Granos elegidos uno por uno", highlight: ["uno", "por"], photo: photos.hero, overlay: 0.75, icon: <BeansIcon /> },
  { text: "Tostado acá, cada semana", highlight: ["acá"], icon: <RoastIcon /> },
  { text: "Latte que se abre en flor", highlight: ["flor"], photo: photos.latte, overlay: 0.6, icon: <LatteFlowerIcon /> },
  { text: "Vení, quedate un rato", highlight: ["vení"], photo: photos.interior, overlay: 0.65, icon: <PinIcon /> },
];

const timing = linearTiming({ durationInFrames: VIDEO.transitionFrames });

export const YvotyReel: React.FC = () => {
  return (
    <TransitionSeries>
      {scenes.map((s, i) => (
        <React.Fragment key={s.text}>
          {i > 0 &&
            (i % 2 ? (
              <TransitionSeries.Transition presentation={fade()} timing={timing} />
            ) : (
              <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={timing} />
            ))}
          <TransitionSeries.Sequence durationInFrames={VIDEO.sceneFrames}>
            <Scene text={s.text} highlight={s.highlight} photo={s.photo} overlay={s.overlay ?? 0.7} icon={s.icon} />
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={timing} />
      <TransitionSeries.Sequence durationInFrames={VIDEO.closingFrames}>
        <Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
