import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsAdvancedWithTrigger,
  SvgPropsWithAdvanced,
} from "../SvgComponent";
const BottomHome = (props: SvgPropsAdvancedWithTrigger) => {
  return (
    <SvgComponent
      height={props.height}
      width={props.width}
      viewBox="0 0 29 29"
      fill={props.fill}
    >
      {props.active ? (
        <Path
          d="M12.3072 3.7311L4.22216 10.2061C3.31216 10.9294 2.72882 12.4578 2.92715 13.6011L4.47882 22.8878C4.75882 24.5444 6.34549 25.8861 8.02549 25.8861H21.0922C22.7605 25.8861 24.3588 24.5328 24.6388 22.8878L26.1905 13.6011C26.3772 12.4578 25.7938 10.9294 24.8955 10.2061L16.8105 3.74276C15.5622 2.73943 13.5438 2.73943 12.3072 3.7311Z"
          fill="#FF9900"
          stroke="#FF9900"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      ) : (
        <Path
          d="M11.0822 3.40266L4.79388 8.30266C3.74388 9.11933 2.89221 10.8577 2.89221 12.176V20.821C2.89221 23.5277 5.09721 25.7443 7.80388 25.7443H21.3139C24.0205 25.7443 26.2255 23.5277 26.2255 20.8327V12.3393C26.2255 10.9277 25.2805 9.11933 24.1255 8.31433L16.9155 3.26266C15.2822 2.11933 12.6572 2.17766 11.0822 3.40266Z"
          stroke={props.color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      )}
    </SvgComponent>
  );
};

export default BottomHome;
