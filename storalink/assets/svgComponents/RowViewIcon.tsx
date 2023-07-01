import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, { SvgBasicProps, SvgPropsWithAdvanced } from "./SvgComponent";

const RowViewIcon = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M3 4.5H21"
        stroke={props.color ?? `#212121"`}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3 9.5H21"
        stroke={props.color ?? `#212121"`}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3 14.5H21"
        stroke={props.color ?? `#212121"`}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3 19.5H21"
        stroke={props.color ?? `#212121"`}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default RowViewIcon;
