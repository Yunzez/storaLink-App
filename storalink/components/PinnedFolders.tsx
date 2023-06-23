import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  StyleProp,
} from "react-native";
import { useModalContext } from "../context/ModalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import FolderCard, { FolderCardProps } from "./FolderCard";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
import BottomModal, { BottomModalRefProps } from "./BottomModal";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import { ViewStyle } from "react-native";
import { ModalDataProps } from "./BottomModal";
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
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
  const {openModal, closeModal } = useModalContext();
  const PinnedFoldersWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    height: ${screenHeight * 0.25}px;
  `;

  const [showMore, setShowMore] = useState(false);
  console.log("pinfolder refresh");

  const modalRef = useRef<BottomModalRefProps | null>(null);
  const activeRef = useRef(false); // Ref instead of state

  const showMenu = useCallback(() => {
    openModal();
  }, [openModal]);

  const modalData: ModalDataProps[] = [
    {
      name: "Manage Pinned Folders",
      onClick: () => {
        console.log("click");
      },
    },
    {
      name: "Create New Pinned Folder",
      onClick: () => {
        console.log("test2");
      },
    },
    {
      name: "View All Pinned Folders",
      onClick: () => {
        console.log("test2");
      },
    },
  ];

  return (
    <View style={parentStyle}>
      <View style={styles.headerWrapperStyle}>
        <ComponentTitle>Pinned Folders</ComponentTitle>
        <ToggleButton
        activeSource={moreIconActive}
        inactiveSource={moreIcon}
        onPress={showMenu} // Passed the showMenu here
      />
      </View>

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
      <BottomModal
        data={modalData}
        height={screenHeight * 0.5}
        // Removed the ref, not needed anymore
        header={{ name: 'Pinned Folders Section', icon: moreIconActive }}
      />
    </View>
  );
};

export default PinnedFolders;

type ToggleButtonProps = {
  activeSource: any;
  inactiveSource: any;
  onPress: () => void;
};

const ToggleButton = React.memo(
  ({ activeSource, inactiveSource, onPress }: ToggleButtonProps) => {
    const { isOpen } = useModalContext();
    return (
      <TouchableOpacity onPress={onPress}> 
        <Image source={isOpen ? activeSource : inactiveSource} />
      </TouchableOpacity>
    );
  }
);
