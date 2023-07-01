import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, { SvgBasicProps } from "./SvgComponent";
const HeartEditIcon = (props:SvgBasicProps) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M21.49 12.0001C21.81 10.9801 22 9.88012 22 8.69012C22 5.60012 19.51 3.1001 16.44 3.1001C14.62 3.1001 13.01 3.98015 12 5.34015C10.99 3.98015 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.60012 2 8.69012C2 15.6901 8.48 19.8201 11.38 20.8201C11.55 20.8801 11.77 20.9101 12 20.9101"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.21 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.82 15.13 19.21 15.74Z"
        stroke="#212121"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.7 16.25C19 17.33 19.84 18.17 20.92 18.47"
        stroke="#212121"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default HeartEditIcon;
