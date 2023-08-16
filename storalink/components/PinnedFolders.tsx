import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  InteractionManager,
} from "react-native";
import { useModalContext } from "../context/ModalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import FolderCard, { FolderCardProps } from "./FolderCard";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext, FolderProps } from "../context/GlobalProvider";
import BottomModal from "./BottomModal";
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

const PinnedFolders = ({ parentStyle }: PinnedFoldersProps) => {
  const { navigator, screenHeight, screenWidth, folderCache } =
    useContext(GlobalContext);
  const [trigger, setTrigger] = useState(true);
  const PinnedFoldersWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    height: ${screenHeight * 0.25}px;
  `;

  const [loaclModalIndicator, setLoaclModalIndicator] = useState(false);
  const pinnedFolders = useMemo(() => {
    return folderCache ? folderCache.filter(folder => folder.pinned) : [];
  }, [folderCache]);

  const route = useRoute();
  const modalData: ModalDataProps[] = [
    {
      name: "Manage Pinned Folders",
      onClick: () => {
        console.log("click ??? ");
      },
      icon: <HeartEditIcon />,
    },
    {
      name: "Create New Pinned Folder",
      onClick: () => {
        console.log("test4");
      },
      icon: <AddIcon />,
    },
    {
      name: "View All Pinned Folders",
      onClick: () => {
        console.log("test4");
      },
      icon: <RightArrowIcon />,
    },
  ];

  const handleCardOnClick = async () => {
    console.log("set folder");
  };

  return (
    <View style={parentStyle}>
      <View style={styles.headerWrapperStyle}>
        <ComponentTitle>Pinned Folders</ComponentTitle>
        <ToggleModalButton
          indicator={loaclModalIndicator}
          onClick={() => setLoaclModalIndicator(true)}
          activeSource={moreIconActive}
          inactiveSource={moreIcon}
        />
      </View>

      <PinnedFoldersWrapper>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pinnedFolders && pinnedFolders.length > 0 ? (
            pinnedFolders.map((card, index) => (
              <FolderCard
                key={index}
                id={card.id}
                title={card.name as string}
                imgUrl={card.thumbNailUrl as string}
                desc={card.desc}
                linksNumber={card.links?.length ?? 0}
                onClick={() => {
                  navigator.navigate("SingleFolderView", {
                    name: card.name,
                    id: card.id,
                  });
                }}
              />
            ))
          ) : (
            <Text>You don't have pinned folders</Text>
          )}
        </ScrollView>
      </PinnedFoldersWrapper>
      <BottomModal
        header={{ name: "Pinned Folders Section", icon: moreIconActive }}
        data={modalData}
        openIndicator={loaclModalIndicator}
        setOpenIndicator={setLoaclModalIndicator}
      />
    </View>
  );
};

export default PinnedFolders;
