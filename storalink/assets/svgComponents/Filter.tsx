import React from "react";
import { Svg, Path, G, Mask, Rect } from "react-native-svg";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
} from "./SvgComponent";
const Filter = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent height={props.height} width={props.width} viewBox="0 0 24 24">
      <Path
        d="M5.3999 2.10001H18.5999C19.6999 2.10001 20.5999 3.00001 20.5999 4.10001V6.30001C20.5999 7.10001 20.0999 8.10001 19.5999 8.60001L15.2999 12.4C14.6999 12.9 14.2999 13.9 14.2999 14.7V19C14.2999 19.6 13.8999 20.4 13.3999 20.7L11.9999 21.6C10.6999 22.4 8.8999 21.5 8.8999 19.9V14.6C8.8999 13.9 8.4999 13 8.0999 12.5L4.2999 8.50001C3.7999 8.00001 3.3999 7.10001 3.3999 6.50001V4.20001C3.3999 3.00001 4.2999 2.10001 5.3999 2.10001Z"
        stroke={props.color}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default Filter;
