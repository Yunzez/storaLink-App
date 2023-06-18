import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FolderCard, { FolderCardProps } from "./FolderCard";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
type PinnedFoldersProps = {
  cardList: FolderCardProps[];
};

const PinnedFolders = ({ cardList }: PinnedFoldersProps) => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);

  const PinnedFoldersWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    height: ${screenHeight * 0.25}px;
    z-index: 10;
  `;

  const ComponentTitle = styled(Text)`
    font-size: 18px;
    margin: 5px;
    color: ${COLORS.themeYellow};
  `;

  return (
    <View>
      <ComponentTitle>Pinned Folders</ComponentTitle>
      <PinnedFoldersWrapper>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cardList.map((card, index) => (
            <FolderCard
              key={index}
              title={card.title}
              imgUrl={card.imgUrl}
              onClick={card.onClick}
            />
          ))}
        </ScrollView>
      </PinnedFoldersWrapper>
    </View>
  );
};

export default PinnedFolders;
