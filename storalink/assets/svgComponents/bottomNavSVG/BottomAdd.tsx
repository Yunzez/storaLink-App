import React from "react";
import { Svg, Path, G, ClipPath, Rect, Defs } from "react-native-svg";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
} from "../SvgComponent";
const BottomAdd = (props: SvgPropsWithAdvanced) => {

  return (
    <SvgComponent
      height={props.height ?? "69"}
      width={props.width ?? "69"}
      viewBox="0 0 69 69"
      fill="none"
    >
      <G clip-path="url(#clip0_663_16907)">
        <Rect
          width="48"
          height="48"
          rx="8"
          transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.558838 34.5893)"
          fill="white"
        />
        <Path
          d="M43.9281 25.1612C49.1135 30.3467 49.1135 38.832 43.9281 44.0174C38.7426 49.2029 30.2573 49.2029 25.0719 44.0174C19.8864 38.832 19.8864 30.3467 25.0719 25.1612C30.2573 19.9758 38.7426 19.9758 43.9281 25.1612Z"
          fill="#FF9900"
          stroke="#FF9900"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M34.5 29.253V39.9256"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M39.8363 34.5893H29.1637"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Rect
        x="1.41421"
        width="46"
        height="46"
        rx="7"
        transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.973051 33.5893)"
        stroke="#FF9900"
        stroke-width="2"
      />
      <Defs>
        <ClipPath id="clip0_663_16907">
          <Rect
            width="48"
            height="48"
            rx="8"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.558838 34.5893)"
            fill="white"
          />
        </ClipPath>
      </Defs>
    </SvgComponent>
  );
};

export default BottomAdd;
