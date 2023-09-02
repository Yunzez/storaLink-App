import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  View,
  Text,
  Animated,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Test from "./Test";
import SearchComponent, {
  searchResultType,
  searchValueType,
} from "../components/SearchbarComponent";
import { FolderProps, GlobalContext } from "../context/GlobalProvider";
import PinnedFolders from "../components/PinnedFolders";
import { MockCardList, MockLinkList } from "../Test/MockData";
import RecentLinks from "../components/RecentLinks";
import BottomModal from "../components/BottomModal";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomModalProps } from "../components/BottomModal";
import { FolderCardProps } from "../components/FolderCard";
export const Home = () => {

  const { navigator, screenHeight, folderCovers, folderCache, shareUrl, setShareUrl } =
    useContext(GlobalContext);

    useEffect(() => {
      console.log('change in share url', shareUrl, shareUrl.length)
      if(shareUrl.length > 0) {
        setShareUrl('')
      }
    }, [shareUrl])

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
  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "flex-start",
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

      <PinnedFolders parentStyle={{ paddingTop: 15 }} />
      <RecentLinks />
    </SafeAreaView>
  );
};

export default Home;
