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
import SearchComponent from "../components/SearchbarComponent";
import { FolderProps, GlobalContext } from "../context/GlobalProvider";
import PinnedFolders from "../components/PinnedFolders";
import { MockCardList, MockLinkList } from "../Test/MockData";
import RecentLinks from "../components/RecentLinks";
import BottomModal from "../components/BottomModal";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomModalProps } from "../components/BottomModal";
import { FolderCardProps } from "../components/FolderCard";
export const Home = () => {
  const { navigator, screenHeight, folderCovers, folderCache} = useContext(GlobalContext);
 

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
        <SearchComponent placeHolder="Search files, saved items, etc..." />
      </View>

      <PinnedFolders parentStyle={{ paddingTop: 15 }} />
      <RecentLinks linkList={MockLinkList} />
    </SafeAreaView>
  );
};

export default Home;
