import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
} from "./SvgComponent";
const MessageQuestion = (props: SvgPropsWithAdvanced) => {
  return (
    <SvgComponent height={props.height} width={props.width}>
      <Path
        d="M17 18.43H13L8.54999 21.39C7.88999 21.83 7 21.36 7 20.56V18.43C4 18.43 2 16.43 2 13.43V7.42993C2 4.42993 4 2.42993 7 2.42993H17C20 2.42993 22 4.42993 22 7.42993V13.43C22 16.43 20 18.43 17 18.43Z"
        stroke={props.color ?? `#212121`}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.0001 11.3599V11.1499C12.0001 10.4699 12.4201 10.1099 12.8401 9.81989C13.2501 9.53989 13.66 9.1799 13.66 8.5199C13.66 7.5999 12.9201 6.85986 12.0001 6.85986C11.0801 6.85986 10.3401 7.5999 10.3401 8.5199"
        stroke={props.color ?? `#212121`}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.9955 13.75H12.0045"
        stroke={props.color ?? `#212121`}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default MessageQuestion;
