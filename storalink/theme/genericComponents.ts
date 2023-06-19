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



  export const ResultsDropdown = styled(View)`
  position: absolute;
  padding: 5px;
`;

