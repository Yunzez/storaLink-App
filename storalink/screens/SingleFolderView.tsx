import React, { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import LoadingScreen from "../components/LoadingScreen";

export const SingleFolderView = () => {
  const { currentFocusedFolder } = useContext(GlobalContext);
  console.log(currentFocusedFolder.id);
  return (
    <SafeAreaView style={{justifyContent: 'center', height: '100%'}}>
      {currentFocusedFolder.id ? (
        <Text>SingleFolderView {currentFocusedFolder.id}</Text>
      ) : (
        <LoadingScreen loadingText="Loading your folder"/>
      )}
    </SafeAreaView>
  );
};

export default SingleFolderView;
