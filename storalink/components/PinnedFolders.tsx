import React, { useCallback, useContext, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  StyleProp,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FolderCard, { FolderCardProps } from "./FolderCard";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
import BottomModal, { BottomModalRefProps } from "./BottomModal";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import { ViewStyle } from "react-native";
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
  const PinnedFoldersWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    height: ${screenHeight * 0.25}px;
  `;

  const [showMore, setShowMore] = useState(false);
  console.log("pinfolder refresh");

  const modalRef = useRef<BottomModalRefProps | null>(null);
  const activeRef = useRef(false); // Ref instead of state

  const showMenu = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.openMenu();
      setShowMore(true);
    }
  }, []); // Empty dependency array because there is no dependency in this function.

  const handleClose = useCallback(() => {
    setShowMore(false);
  }, []); // Empty dependency array because there is no dependency in this function.

  const FolderCardMemo = React.memo(FolderCard);
  return (
    <View style={parentStyle}>
      <View style={styles.headerWrapperStyle}>
        <ComponentTitle>Pinned Folders</ComponentTitle>
        <ToggleButton
          isActive={showMore}
          activeSource={moreIconActive}
          inactiveSource={moreIcon}
          onPress={showMenu}
        />
      </View>

      <PinnedFoldersWrapper>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cardList.map((card, index) => (
            <FolderCardMemo
              key={index}
              title={card.title}
              imgUrl={card.imgUrl}
              onClick={card.onClick}
            />
          ))}
        </ScrollView>
      </PinnedFoldersWrapper>
      <BottomModal height={screenHeight * 0.5} ref={modalRef} onClose={handleClose} />
    </View>
  );
};

export default PinnedFolders;

type ToggleButtonProps = {
  isActive: boolean;
  activeSource: any;
  inactiveSource: any;
  onPress: () => void;
};

const ToggleButton = React.memo(
  ({ isActive, activeSource, inactiveSource, onPress }: ToggleButtonProps) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={isActive ? activeSource : inactiveSource} />
      </TouchableOpacity>
    );
  }
);
