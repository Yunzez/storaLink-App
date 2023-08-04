import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  StyleProp,
  InteractionManager
} from "react-native";
import { useModalContext } from "../context/ModalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import FolderCard, { FolderCardProps } from "./FolderCard";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext, FolderProps } from "../context/GlobalProvider";
import BottomModal, { BottomModalRefProps } from "./BottomModal";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import { ViewStyle } from "react-native";
import { ModalDataProps } from "./BottomModal";
import HeartEditIcon from "../assets/svgComponents/HeartEditIcon";
import RightArrowIcon from "../assets/svgComponents/RightArrowIcon";
import AddIcon from "../assets/svgComponents/AddIcon";
import { MockSingleFolderData } from "../Test/MockData";
import ToggleModalButton from "./ToggleModalButton";
import { fetchFolderDataById } from "../utils";
type PinnedFoldersProps = {
  cardList: FolderCardProps[];
  parentStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
};

const ComponentTitle = styled(Text)`
  font-size: 18px;
  margin: 5px;
  color: ${COLORS.themeYellow};
`;

const styles = StyleSheet.create({
  headerWrapperStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const PinnedFolders = ({ cardList, parentStyle }: PinnedFoldersProps) => {
  const { navigator, screenHeight, screenWidth, setCurrentFocusedFolder } =
    useContext(GlobalContext);
  const [trigger, setTrigger] = useState(true)
  const PinnedFoldersWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    height: ${screenHeight * 0.25}px;
  `;
  console.log("pinfolder refresh");
  const route = useRoute();
  const modalData: ModalDataProps[] = [
    {
      name: "Manage Pinned Folders",
      onClick: () => {
        console.log("click");
      },
      icon: <HeartEditIcon />,
    },
    {
      name: "Create New Pinned Folder",
      onClick: () => {
        console.log("test2");
      },
      icon: <AddIcon />,
    },
    {
      name: "View All Pinned Folders",
      onClick: () => {
        console.log("test2");
      },
      icon: <RightArrowIcon />,
    },
  ];

  const handleCardOnClick = async () => {
    console.log("set folder");
   
    const folderData = await fetchFolderDataById(MockSingleFolderData[0].id);
    // navigator.navigate('SingleFolderView', {name: folderData?.name})
    setCurrentFocusedFolder(folderData as FolderProps);
    
};

  return (
    <View style={parentStyle}>
      <View style={styles.headerWrapperStyle}>
        <ComponentTitle>Pinned Folders</ComponentTitle>
        <ToggleModalButton
          activeSource={moreIconActive}
          inactiveSource={moreIcon}
        />
      </View>

      <PinnedFoldersWrapper>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cardList ? cardList.map((card, index) => (
            <FolderCard
              key={index}
              title={card.title}
              imgUrl={card.imgUrl}
              onClick={ () => {
                navigator.navigate('SingleFolderView', {name: 'test', id: MockSingleFolderData[0].id})
                InteractionManager.runAfterInteractions(() => {
                  card.onClick();
                  handleCardOnClick();
                });
              }}
            />
          )) : <Text>You don't have pinned folders</Text>}
        </ScrollView>
      </PinnedFoldersWrapper>
      <BottomModal
        data={modalData}
        height={screenHeight * 0.5}
        // Removed the ref, not needed anymore
        header={{ name: "Pinned Folders Section", icon: moreIconActive }}
      />
    </View>
  );
};

export default PinnedFolders;
