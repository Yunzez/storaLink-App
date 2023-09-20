import React, { useContext, useEffect, useMemo, useState } from "react";
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
import SearchComponent, { searchResultType, searchValueType } from "../components/SearchbarComponent";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
import { COLORS, SPACE } from "../theme/constants";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import SmallLinkView from "../components/SmallLinkView";
import { SocialMediaSrc } from "../utils";
import { useModalContext } from "../context/ModalContext";
import BottomModal, { ModalDataProps } from "../components/BottomModal";
import OutLinedButton from "../components/OutLinedButton";
import { coverImages } from "../assets/imageAssetsPrerequire";
export const Files = () => {
  const { screenHeight, folderCache, navigator } = useContext(GlobalContext);
  const [blockView, setBlockView] = useState(true);

  const FolderListWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    height: ${screenHeight * 0.8}px;
  `;

  const searchAlgorithm = (value: string): Map<string, searchResultType> => {
    const retMap = new Map();
    if (!folderCache) {
      retMap.set("You have no folder yet, go create your first folder", {
        value: "no val",
        onClick: () => {},
        valueType: searchValueType.noValue,
      });
      return retMap;
    }
    for (const cover of folderCache) {
      console.log(cover);
      if (cover.name?.includes(value)) {
        retMap.set(cover.name, {
          onClick: () => {
            console.log(cover.id);
            navigator.navigate("SingleFolderView", {
              name: cover.name,
              id: cover.id,
            });
          },
        });
      }
    }
    if (retMap.size === 0) {
      retMap.set("There is no result", { onClick: () => {} });
    }
    return retMap;
  };

  useEffect(() => {
    console.log('folder cache update detected in files', folderCache)
    //! this useEffect is to detect chanege in folderCache so we can update card appearance 
    //! there is a possibility for optimization by putting this lower down to folder card, not required rn 
  }, [folderCache])

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
          algorithm={searchAlgorithm}
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
                  pinned = {card.pinned}
                    id={card.id}
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

    </SafeAreaView>
  );
};

export default Files;
