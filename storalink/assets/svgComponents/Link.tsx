import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
} from "./SvgComponent";
const Link = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent height={props.height ?? '32'} width={props.width ?? '33'} viewBox="0 0 32 33">
      <Path
        d="M17.1779 15.0308C19.6779 17.5308 19.6779 21.5752 17.1779 24.0641C14.6779 26.553 10.6334 26.5641 8.14452 24.0641C5.65563 21.5641 5.64452 17.5197 8.14452 15.0308"
        stroke="#FF9900"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.4334 17.7752C11.8334 15.1752 11.8334 10.953 14.4334 8.34186C17.0334 5.73075 21.2556 5.74186 23.8667 8.34186C26.4778 10.9419 26.4667 15.1641 23.8667 17.7752"
        stroke="#FF9900"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default Link;
