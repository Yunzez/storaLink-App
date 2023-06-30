import React from "react";
import { Svg, Path } from "react-native-svg";
const AddIcon = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
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
    </Svg>
  );
};

export default AddIcon;
