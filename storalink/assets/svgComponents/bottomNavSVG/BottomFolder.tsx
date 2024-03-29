import React from "react";
import { Svg, Path } from "react-native-svg";
import { View } from "react-native";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
  SvgPropsAdvancedWithTrigger,
} from "../SvgComponent";
const BottomFolder = (props: SvgPropsAdvancedWithTrigger) => {
  return (
    <View>
      {props.active ? (
        <SvgComponent
          height={props.height}
          width={props.width}
          viewBox="0 0 29 29"
          fill={props.fill}
        >
          <Path
            d="M25.1288 14.1608L24.9421 13.9041C24.6154 13.5074 24.2304 13.1924 23.7871 12.9591C23.1921 12.6208 22.5154 12.4458 21.8154 12.4458H7.29045C6.59045 12.4458 5.92545 12.6208 5.31878 12.9591C4.86378 13.2041 4.45545 13.5424 4.11712 13.9624C3.45212 14.8141 3.13712 15.8641 3.24212 16.9141L3.67378 22.3624C3.82545 24.0074 4.02378 26.0374 7.72212 26.0374H21.3955C25.0938 26.0374 25.2804 24.0074 25.4438 22.3508L25.8754 16.9258C25.9804 15.9458 25.7238 14.9658 25.1288 14.1608Z"
            fill="#FF9900"
          />
          <Path
            d="M24.5598 10.5418C24.5923 10.9252 24.1782 11.1822 23.8167 11.0507C23.1874 10.8218 22.5216 10.7074 21.8272 10.7074H7.29053C6.59237 10.7074 5.90578 10.8289 5.27146 11.0595C4.91417 11.1894 4.5022 10.9425 4.5022 10.5623V8.14075C4.5022 3.97575 5.77386 2.70409 9.93886 2.70409H11.3155C12.9839 2.70409 13.5089 3.24075 14.1855 4.11575L15.5855 5.98242C15.8772 6.37909 15.8889 6.40242 16.4022 6.40242H19.1789C22.882 6.40242 24.294 7.40971 24.5598 10.5418Z"
            fill="#FF9900"
          />
        </SvgComponent>
      ) : (
        <SvgComponent
          height={props.height}
          width={props.width}
          viewBox="0 0 29 29"
          fill={props.fill}
        >
          <Path
            d="M25.8406 16.7727L25.3739 22.606C25.1989 24.391 25.0589 25.756 21.8972 25.756H7.22056C4.05889 25.756 3.91889 24.391 3.74389 22.606L3.27722 16.7727C3.18389 15.8043 3.48722 14.906 4.03556 14.2177C4.04722 14.206 4.04722 14.206 4.05889 14.1943C4.70056 13.4127 5.66889 12.9227 6.75389 12.9227H22.3639C23.4489 12.9227 24.4056 13.4127 25.0356 14.171C25.0472 14.1827 25.0589 14.1943 25.0589 14.206C25.6306 14.8943 25.9456 15.7927 25.8406 16.7727Z"
            stroke={props.color}
            stroke-width="2"
            stroke-miterlimit="10"
          />
          <Path
            d="M4.64221 13.4243V7.41599C4.64221 3.44932 5.63388 2.45766 9.60055 2.45766H11.0822C12.5639 2.45766 12.9022 2.90099 13.4622 3.64766L14.9439 5.63099C15.3172 6.12099 15.5389 6.42432 16.5305 6.42432H19.5055C23.4722 6.42432 24.4639 7.41599 24.4639 11.3827V13.471"
            stroke={props.color}
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </SvgComponent>
      )}
    </View>
  );
};

export default BottomFolder;
