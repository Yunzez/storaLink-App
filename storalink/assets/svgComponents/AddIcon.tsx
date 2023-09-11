import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, { SvgPropsWithAdvanced } from "./SvgComponent";
import { SvgBasicProps } from "./SvgComponent";
const AddIcon = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M6 12H18"
        stroke={props.color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 18V6"
        stroke={props.color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default AddIcon;
