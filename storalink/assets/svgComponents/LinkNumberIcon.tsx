import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent from "./SvgComponent";
import { SvgBasicProps } from "./SvgComponent";
import { COLORS } from "../../theme/constants";
const LinkNumberIcon = (props: SvgBasicProps) => {
  return (
    <SvgComponent height={props.height} width={props.width} viewBox={`0 0 12 12`}>
      <Path
        d="M6.53001 5.46997C7.65501 6.59497 7.65501 8.41497 6.53001 9.53497C5.40501 10.655 3.58501 10.66 2.46501 9.53497C1.34501 8.40997 1.34001 6.58997 2.46501 5.46997"
        stroke= {COLORS.darkGrey}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.29501 6.70494C4.12501 5.53494 4.12501 3.63494 5.29501 2.45994C6.46501 1.28494 8.36501 1.28994 9.54001 2.45994C10.715 3.62994 10.71 5.52994 9.54001 6.70494"
        stroke={COLORS.darkGrey}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default LinkNumberIcon;
