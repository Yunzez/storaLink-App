
import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, { SvgBasicProps, SvgPropsWithAdvanced } from "./SvgComponent";
const Pencil = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M13.26 5.43908L5.04997 14.1291C4.73997 14.4591 4.43997 15.1091 4.37997 15.5591L4.00997 18.7991C3.87997 19.9691 4.71997 20.7691 5.87997 20.5691L9.09997 20.0191C9.54997 19.9391 10.18 19.6091 10.49 19.2691L18.7 10.5791C20.12 9.07908 20.76 7.36908 18.55 5.27908C16.35 3.20908 14.68 3.93908 13.26 5.43908Z"
        stroke={props.color ?? `#212121`}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.89 6.88916C12.32 9.64916 14.56 11.7592 17.34 12.0392"
        stroke={props.color ?? `#212121`}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default Pencil;
