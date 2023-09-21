import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text, ImageSourcePropType, Image } from "react-native";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import ToggleModalButton from "./ToggleModalButton";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import { FolderProps, GlobalContext } from "../context/GlobalProvider";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";
import BottomModal, { ModalDataProps } from "./BottomModal";
import HeartEditIcon from "../assets/svgComponents/HeartEditIcon";
import RightArrowIcon from "../assets/svgComponents/RightArrowIcon";
import AddIcon from "../assets/svgComponents/AddIcon";
import placeholder from "../assets/mockImg/placeholder.png";
import { isLocalPath } from "../utils";
import { coverImagesMap } from "../assets/imageAssetsPrerequire";
const PinnedBadge = styled(View)`
  border-radius: ${SPACE.roundMd};
  border: 1px solid ${COLORS.lightGrey};
  min-width: 80px;
  padding-top: ${SPACE.md};
  padding-bottom: ${SPACE.md};
  padding-left: ${SPACE.sm};
  padding-right: ${SPACE.sm};
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: ${COLORS.lightGrey};
`;

const BadgeImage = styled(Image)`
border-radius: ${SPACE.sm};
width: 20px;
height: 20px;
margin-end: 3px;
`
type PinnedFolderBadge = {
  folder: FolderProps;
};
const PinnedFolderBadge = ({ folder }: PinnedFolderBadge) => {
    const {navigator} = useContext(GlobalContext)
    console.log(folder)
  const [loaclModalIndicator, setLoaclModalIndicator] = useState(false);
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
  return (
    <View>
      <TouchableOpacity onPress={() => {navigator.navigate('SingleFolderView',  {
                    name: folder.name,
                    id: folder.id,
                  })}}>
        <PinnedBadge style={{ justifyContent: "space-around" }}>
          {
            typeof folder.thumbNailUrl === "string" && folder.thumbNailUrl?.length === 0 || !folder.thumbNailUrl ? (
              // precheck if the imgUrl is not filled out, we use default value if not
              <BadgeImage source={placeholder as ImageSourcePropType} />
            ) : typeof folder.thumbNailUrl === "number" ? ( // Check if imgUrl is a local path
              <BadgeImage source={folder.thumbNailUrl as ImageSourcePropType} />
            ) :folder.thumbNailUrl.includes("cover_") ? (
                <BadgeImage source={coverImagesMap[folder.thumbNailUrl as string]} />
              ) :(
              <BadgeImage source={{ uri: folder.thumbNailUrl }} />
            ) // Use the image URI
          }
          <Text style={{ fontSize: 15, marginEnd: 5 }}> {folder.name}</Text>
          <ToggleModalButton
            indicator={loaclModalIndicator}
            onClick={() => setLoaclModalIndicator(true)}
            activeSource={moreIconActive}
            inactiveSource={moreIcon}
          />
        </PinnedBadge>
      </TouchableOpacity>

      <BottomModal
        header={{ name: "Manage Folder" }}
        data={modalData}
        openIndicator={loaclModalIndicator}
        setOpenIndicator={setLoaclModalIndicator}
      />
    </View>
  );
};

export default PinnedFolderBadge;
