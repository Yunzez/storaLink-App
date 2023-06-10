import React, { useContext } from "react";
import { Button, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Test from "./Test";
import { SearchBar } from "../theme/genericComponents";
import { GlobalContext } from "../context/GlobalProvider";
import PinnedFolders from "../components/PinnedFolders";
import { MockCardList, MockLinkList } from "../Test/MockData";
import RecentLinks from "../components/RecentLinks";
export const Home = () => {
  const { navigator, screenHeight } = useContext(GlobalContext);
  return (
    <View style={{ display:'flex', justifyContent:'flex-start', alignItems: "center", marginTop: 15 }}>
      <SearchBar placeholder="Search files, saved items, etc..."/>
      <PinnedFolders cardList={MockCardList}/>
      <RecentLinks linkList={MockLinkList}/>

    {/* <Button
      title="Go to Test"
      onPress={() => navigator.navigate('Test_home')}
    />
    <Button
      title="Back to Login"
      onPress={() => navigator.navigate('Login')}
    /> */}
  </View>
  );
};

export default Home;
