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
import PinnedFolderIcon from "../assets/svgComponents/PinnedFolderIcon";
import LinkNumberIcon from "../assets/svgComponents/LinkNumberIcon";
import StoraModal from "./StoraModal";
export type FolderCardProps = {
  id: number;
  title: string;
  imgUrl: string;
  desc?: string;
  linksNumber: number;
  onClick: () => void;
  pinned?: boolean;
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
    dispatchFolderCovers,
  } = useContext(GlobalContext);

  const [showModal, setShowModal] = useState(false);
  const [loaclModalIndicator, setLoaclModalIndicator] = useState(false);

  const modalData: ModalDataProps[] = [
    {
      name: "Pin",
      onClick: () => {
        // setLoaclModalIndicator(false)
        dispatchFolderCache({ type: "PIN_FOLDER", folderId: props.id });
      },
    },
    {
      name: "Unpin",
      onClick: () => {
        dispatchFolderCache({ type: "UNPIN_FOLDER", folderId: props.id });
      },
    },
    {
      name: "Private Folder",
      onClick: () => {
        console.log("test3");
      },
    },
    {
      name: "Delete Folder",
      onClick: () => {
        console.log("click delete");
        setShowModal(true);
      },
    },
  ];

  console.log("test url:", props.imgUrl, props.id, props.pinned);

  useEffect(() => {
    console.log(props.pinned);
  });
  console.log("image url: ", props.imgUrl);
  return (
    <Card
      onPress={() => {
        props.onClick();
      }}
    >
      <StoraModal
        trigger={showModal}
        setTrigger={setShowModal}
        headerText="Delete"
      >
        <View style={{ padding: 10, paddingTop: 20 }}>
          <Text style={{ marginVertical: 10 }}>
            Are you sure you want to delete{" "}
            <Text style={{ fontWeight: "400" }}>
              Long Link Title Placeholder 1?
            </Text>
          </Text>
          <View style={{flexDirection: "row", justifyContent: 'flex-end'}}>
          <TouchableOpacity
             
              style={{
                borderColor: COLORS.standardBlack,
                padding: 8,
                borderWidth: 2,
                borderRadius: SPACE.nativeRoundMd,
                marginEnd: 10
              }}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={{color: COLORS.standardBlack, fontWeight: '500'}}>No, Keep It</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: COLORS.themeYellow,
                padding: 8,
                borderWidth: 2,
                backgroundColor: COLORS.themeYellow,
                borderRadius: SPACE.nativeRoundMd,
              }}
              onPress={() => {
                dispatchFolderCovers({ type: "REMOVE", folderId: props.id });
                dispatchFolderCache({
                  type: "REMOVE_FOLDER",
                  folderId: props.id,
                });
              }}
            >
              <Text style={{color: COLORS.white, fontWeight: '500'}}>Yes, Delete</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </StoraModal>
      {props.pinned && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: COLORS.themeYellow,
            zIndex: 999,
            padding: 3,
            borderRadius: SPACE.nativeRoundSm,
          }}
        >
          <PinnedFolderIcon width="18" height="18" />
        </View>
      )}
      {
        props.imgUrl?.length === 0 || !props.imgUrl ? (
          // precheck if the imgUrl is not filled out, we use default value if not
          <CardImage source={placeholder as ImageSourcePropType} />
        ) : isLocalPath(props.imgUrl) ? ( // Check if imgUrl is a local path
          <CardImage source={props.imgUrl as ImageSourcePropType} />
        ) : (
          <CardImage source={{ uri: props.imgUrl }} />
        ) // Use the image URI
      }
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignContent: "center",
          marginHorizontal: 5,
        }}
      >
        <LinkNumberIcon height="15" width="15" />
        <Text style={{ color: COLORS.darkGrey, marginStart: 2 }}>
          {props.linksNumber}
        </Text>
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
