import React from "react";
import { Svg, Path } from "react-native-svg";
const RowViewIcon = (props: { height?: string; width?: string }) => {
  return (
    <Svg
      width={props.width ?? "24"}
      height={props.height ?? "24"}
      viewBox="0 0 24 24"
    >
      <Path
        d="M3 4.5H21"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3 9.5H21"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3 14.5H21"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3 19.5H21"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default RowViewIcon;
