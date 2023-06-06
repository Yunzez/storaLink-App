import { TextInput, View } from "react-native";
import styled from "styled-components/native";
import { COLORS, SPACE } from "./constants";
export const SearchBar = styled(TextInput)`
background-color: ${COLORS.lightOrange};
width: 80%;
padding: ${SPACE.lg}
border-radius: ${SPACE.roundMd}
`