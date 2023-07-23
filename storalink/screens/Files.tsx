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
  const { screenHeight } = useContext(GlobalContext);
  const { openModal } = useModalContext();
  const [blockView, setBlockView] = useState(false);
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
      <SearchComponent placeHolder="Search files, saved items, etc..." />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: " 80%",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <OutLinedButton text="Order By" onClick={() => {
            openModal();
          }}/>
       

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

      <View style={{ flex: 1, justifyContent: "center", width: '85%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FolderListWrapper>
            {blockView
              ? MockCardList.map((card, index) => (
                  <FolderCard
                    key={index}
                    title={card.title}
                    imgUrl={card.imgUrl}
                    onClick={card.onClick}
                  />
                ))
              : MockCardList.map((card, index) => (
                  <SmallLinkView
                    key={index}
                    title={card.title}
                    socialMediaType={SocialMediaSrc.INS}
                  />
                ))}
          </FolderListWrapper>
        </ScrollView>
      </View>
      <BottomModal
        data={modalData}
        header={{ name: "Pinned Folders Section" }}
      />
    </SafeAreaView>
  );
};

export default Files;
