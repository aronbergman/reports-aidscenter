import React from "react";
import { MaskedInput } from "antd-mask-input";

export const CodeInput = (props) => {
  return (
    <MaskedInput
      mask="W/WW/WW/WW.WW.WWWW"
      placeholder="П/ИИ/ММ/ДД.ДД.ДДДД"
      isRevealingMask={true}
      size="18"
      {...props}
      formatCharacters={{
        W: {
          validate() {
            return true;
          },
          transform(char) {
            return char.toUpperCase();
          },
        },
      }}
    />
  );
};
