import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent from "./SvgComponent";
import { SvgBasicProps } from "./SvgComponent";
const AddIcon = (props: SvgBasicProps) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M6 12H18"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 18V6"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default AddIcon;
