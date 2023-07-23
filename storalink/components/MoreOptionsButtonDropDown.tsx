import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Menu, Button } from "native-base";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import { InterfaceMenuProps } from "native-base/lib/typescript/components/composites/Menu/types";
type OptionType = {
  name: string;
  onClick: () => void;
};

type OptionsDropDownType = {
  option: OptionType[];
  title?: string;
};

type MenuPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right"
  | "right top"
  | "right bottom"
  | "left top"
  | "left bottom"
  | "auto";

export const MoreOptionsButtonDropDown = (props: OptionsDropDownType) => {
  const [position, setPosition] = React.useState<MenuPlacement>('auto');
  return (
    <Menu
      placement={position == 'auto' ? "bottom right" : position}
      trigger={(triggerProps) => {
        return (
          <TouchableOpacity {...triggerProps}>
            <Image source={moreIcon} />
          </TouchableOpacity>
        );
      }}
    >
      {props.option.map((opt) => (
        <Menu.Item key={opt.name} onPress={opt.onClick}>
          {opt.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MoreOptionsButtonDropDown;
