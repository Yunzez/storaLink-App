import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, { SvgBasicProps } from "./SvgComponent";
const RightArrowIcon = (props: SvgBasicProps) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M14.4299 5.92993L20.4999 11.9999L14.4299 18.0699"
        stroke="#212121"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.5 12H20.33"
        stroke="#212121"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default RightArrowIcon;

export const RightArrowOpenIcon = (props: SvgBasicProps) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M9 18L15.4304 13.0606C16.1899 12.4773 16.1899 11.5227 15.4304 10.9394L9 6"
        stroke="#212121"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgComponent>
  );
};
