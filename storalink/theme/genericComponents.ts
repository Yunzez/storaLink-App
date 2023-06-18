import { TextInput, View, Animated } from "react-native";
import styled, {css} from "styled-components/native";
import { COLORS, SPACE } from "./constants";

type SearchBarProps = {
    isFocused?: boolean;
  }; 
export const SearchBar = styled(TextInput)<SearchBarProps>`
  background-color: ${COLORS.lightOrange};
  width: 100%;
  padding: ${SPACE.lg};
  border-radius: ${SPACE.roundMd};
  ${(props) => props.isFocused && css`
    background-color: ${COLORS.themeYellow}; 
  `}
`;


type ResultsDropdownProps = {
    show?: boolean;
  }; 
  export const ResultsDropdown = styled(View)<ResultsDropdownProps>`
  position: absolute;
  background-color: ${COLORS.white};
  margin-top: -5px;
  width: 80%;
  padding: ${SPACE.lg};
  border-radius: ${SPACE.roundMd};
  margin-bottom: 15px;
  height: ${(props) => (props.show ? "200px" : "0")};
  shadow-color: ${COLORS.darkGrey};
  shadow-offset: {
    width: 0,
    height: 2,
  };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 10;
`;

