import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
} from "./SvgComponent";
const UploadImageSVG = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent
      height={props.height ?? '24'}
      width={props.width ?? '25'}
      viewBox="0 0 24 25"
    >
      <Path
        d="M9 10.2085C10.1046 10.2085 11 9.31307 11 8.2085C11 7.10393 10.1046 6.2085 9 6.2085C7.89543 6.2085 7 7.10393 7 8.2085C7 9.31307 7.89543 10.2085 9 10.2085Z"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13 2.2085H9C4 2.2085 2 4.2085 2 9.2085V15.2085C2 20.2085 4 22.2085 9 22.2085H15C20 22.2085 22 20.2085 22 15.2085V10.2085"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18 8.2085V2.2085L20 4.2085"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18 2.2085L16 4.2085"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.66992 19.1586L7.59992 15.8486C8.38992 15.3186 9.52992 15.3786 10.2399 15.9886L10.5699 16.2786C11.3499 16.9486 12.6099 16.9486 13.3899 16.2786L17.5499 12.7086C18.3299 12.0386 19.5899 12.0386 20.3699 12.7086L21.9999 14.1086"
        stroke="#212121"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default UploadImageSVG;
