import React, { useContext, useEffect, useState } from "react";
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
import { FolderProps, GlobalContext } from "../context/GlobalProvider";
import { isLocalPath } from "../utils";
import placeholder from "../assets/mockImg/placeholder.png";
import MoreOptionsButtonDropDown from "./MoreOptionsButtonDropDown";
import BottomModal, { ModalDataProps } from "./BottomModal";
import ToggleModalButton from "./ToggleModalButton";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import { useModalContext } from "../context/ModalContext";
export type FolderCardProps = {
  id: number;
  title: string;
  imgUrl: string;
  desc?: string;
  linksNumber: number;
  onClick: () => void;
};

export interface FolderCardInput {
  card: FolderProps;
}

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

const FolderCard = React.memo((props: FolderCardProps) => {
  const {
    navigator,
    setCurrentFocusedFolder,
    screenHeight,
    folderCache,
    dispatchFolderCache,
  } = useContext(GlobalContext);

  const [loaclModalIndicator, setLoaclModalIndicator] = useState(false);

 
  const modalData: ModalDataProps[] = [
    {
      name: "Pin",
      onClick: () => {
        setLoaclModalIndicator(false)
        dispatchFolderCache({ type: "PIN_FOLDER", folderId: props.id });
      },
    },
    {
      name: "Unpin",
      onClick: () => {
        console.log("test3");
      },
    },
    {
      name: "Private Folder",
      onClick: () => {
        console.log("test3");
      },
    },
  ];

  console.log("test url:", props.imgUrl, props.id);
  return (
    <Card
      onPress={() => {
        props.onClick();
      }}
    >
      {
        props.imgUrl?.length === 0 ? (
          // precheck if the imgUrl is not filled out, we use default value if not
          <CardImage source={placeholder as ImageSourcePropType} />
        ) : isLocalPath(props.imgUrl) ? ( // Check if imgUrl is a local path
          <CardImage source={props.imgUrl as ImageSourcePropType} />
        ) : (
          <CardImage source={{ uri: props.imgUrl }} />
        ) // Use the image URI
      }
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CardTitle>{props.title}</CardTitle>
        <ToggleModalButton
          onClick={() => {
            setLoaclModalIndicator(!loaclModalIndicator);
          }}
          indicator={loaclModalIndicator}
          activeSource={moreIconActive}
          inactiveSource={moreIcon}
        />
      </View>
      <BottomModal
        header={{ name: "Manage Folder" }}
        data={modalData}
        openIndicator={loaclModalIndicator}
        setOpenIndicator={setLoaclModalIndicator}
      />
    </Card>
  );
});

export default FolderCard;
