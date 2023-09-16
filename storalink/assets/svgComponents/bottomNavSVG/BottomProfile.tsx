import React from "react";
import { Svg, Path } from "react-native-svg";
import { View } from "react-native";
import SvgComponent, {
  SvgBasicProps,
  SvgPropsWithAdvanced,
  SvgPropsAdvancedWithTrigger
} from "../SvgComponent";
const BottomProfile = (props: SvgPropsAdvancedWithTrigger) => {
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
            d="M14.6094 13.0634C14.5043 13.0516 14.3781 13.0516 14.2625 13.0634C11.761 12.9687 9.77454 10.6604 9.77454 7.81932C9.77454 4.91909 11.8556 2.5634 14.4412 2.5634C17.0163 2.5634 19.1079 4.91909 19.1079 7.81932C19.0974 10.6604 17.1109 12.9687 14.6094 13.0634Z"
            fill="#FF9900"
            stroke="#FF9900"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M8.44792 16.0871C5.55007 18.2791 5.55007 21.8511 8.44792 24.0295C11.7409 26.5191 17.1415 26.5191 20.4345 24.0295C23.3323 21.8376 23.3323 18.2655 20.4345 16.0871C17.1534 13.611 11.7529 13.611 8.44792 16.0871Z"
            fill="#FF9900"
            stroke="#FF9900"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            d="M14.6279 12.771C14.5112 12.7593 14.3712 12.7593 14.2429 12.771C11.4662 12.6776 9.26123 10.4026 9.26123 7.60264C9.26123 4.7443 11.5712 2.42264 14.4412 2.42264C17.2996 2.42264 19.6212 4.7443 19.6212 7.60264C19.6096 10.4026 17.4046 12.6776 14.6279 12.771Z"
            stroke={props.color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M8.79438 17.076C5.97105 18.966 5.97105 22.046 8.79438 23.9243C12.0027 26.071 17.2644 26.071 20.4727 23.9243C23.296 22.0343 23.296 18.9543 20.4727 17.076C17.276 14.941 12.0144 14.941 8.79438 17.076Z"
            stroke={props.color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </SvgComponent>
      )}
    </View>
  );
};

export default BottomProfile;
