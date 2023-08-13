import React, { useContext, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "../theme/genericComponents";
import styled from "styled-components";
import { MockCardList } from "../Test/MockData";
import FolderCard from "../components/FolderCard";
import { GlobalContext } from "../context/GlobalProvider";
import SearchComponent from "../components/SearchbarComponent";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
import { COLORS, SPACE } from "../theme/constants";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import SmallLinkView from "../components/SmallLinkView";
import { SocialMediaSrc } from "../utils";
import { useModalContext } from "../context/ModalContext";
import BottomModal, { ModalDataProps } from "../components/BottomModal";
import OutLinedButton from "../components/OutLinedButton";

export const Files = () => {
  const { screenHeight, folderCache, navigator } = useContext(GlobalContext);
  const { openModal } = useModalContext();
  const [blockView, setBlockView] = useState(true);
  const modalData: ModalDataProps[] = [
    {
      name: "Pin",
      onClick: () => {
        console.log("click");
      },
    },
    {
      name: "Unpin",
      onClick: () => {
        console.log("test2");
      },
    },
    {
      name: "Private Folder",
      onClick: () => {
        console.log("test2");
      },
    },
  ];
  const FolderListWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    height: ${screenHeight * 0.8}px;
  `;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <View style={{ width: "80%", zIndex: 5 }}>
        <SearchComponent
          placeHolder="Search files, saved items, etc..."
          useSearchDropDown={false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: " 80%",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <OutLinedButton
          text="Order By"
          onClick={() => {
            openModal();
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: blockView ? COLORS.white : COLORS.themeYellow,
              borderRadius: SPACE.nativeRoundSm,
            }}
            onPress={() => {
              setBlockView(false);
            }}
          >
            <RowViewIcon
              width="12"
              height="12"
              color={blockView ? COLORS.themeYellow : COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: blockView ? COLORS.themeYellow : COLORS.white,
              borderRadius: SPACE.nativeRoundSm,
            }}
            onPress={() => {
              setBlockView(true);
            }}
          >
            <BlockViewIcon
              width="12"
              height="12"
              color={blockView ? COLORS.white : COLORS.themeYellow}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center", width: "85%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FolderListWrapper>
            {folderCache ? (
              blockView ? (
                folderCache.map((card, index) => (
                  <FolderCard
                    key={index}
                    title={card.name as string}
                    imgUrl={card.thumbNailUrl as string}
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
                folderCache &&
                folderCache.map((card, index) => (
                  <SmallLinkView
                    key={index}
                    title={card.name as string}
                    socialMediaType={SocialMediaSrc.INS}
                  />
                ))
              )
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>You have no folders yet</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate("Add", {screen: 'add_new_folder'});
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.themeYellow,
                      fontSize: 18,
                      textDecorationLine: "underline",
                    }}
                  >
                    Go crete a folder
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </FolderListWrapper>
        </ScrollView>
      </View>

      {/* this modal will response to all actions within the children of this page */}
      <BottomModal
        data={modalData}
        header={{ name: "Manage Folder" }}
      />
    </SafeAreaView>
  );
};

export default Files;
