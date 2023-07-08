import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
export type FolderCardProps = {
  title: string;
  imgUrl: string;
  onClick: () => void;
};
const FolderCard = (props: FolderCardProps) => {
  const {navigator, setCurrentFocusedFolder} = useContext(GlobalContext)
  const Card = styled(TouchableOpacity)`
    margin: 5px;
    paddin: 5px;
    width: 140px;
    height: 190px;
    margin-right: 10px;
    background-color: ${COLORS.lightGrey};
    border-radius: ${SPACE.md};
  `;

  const CardImage = styled(Image)`
    width: 100%;
    height: 70%;
    border-radius: ${SPACE.md};
    border-width: 1px;
    border-color: ${COLORS.themeYellow};
  `;

  const CardTitle = styled(Text)`
    margin: 5px;
    font-size: 15px;
    color: ${COLORS.darkGrey};
    font-weight: 500;
  `;
  return (
    <Card onPress={() => {props.onClick()}}>
      <CardImage source={props.imgUrl as ImageSourcePropType} />
      <CardTitle>{props.title}</CardTitle>
      {/* Display image and other card details here */}
    </Card>
  );
};

export default FolderCard;
