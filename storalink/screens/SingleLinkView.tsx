import React, { useState, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import { RetrunButton } from "../theme/genericComponents";
import HeaderWithBackButton from "../components/HeaderWithBackBtn";
import { useRoute } from "@react-navigation/native";

const SingleLinkView = () => {
  const {
    setCurrentFocusedFolder,
    navigator,
    screenHeight,
    screenWidth,
    dispatchFolderCache,
    folderCache,
  } = useContext(GlobalContext);
  const route = useRoute();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
      }}
    >
      <View style={{ width: "80%" }}>
        <HeaderWithBackButton
          title="Link Test"
          navigateToScreen="SingleFolderView"
          navigateToParams="SingleFolderView"
          navigateOptions= {{id: route.params?.id}}
        />
        <View style={{ marginTop: 10 }}>
          <Text>Test</Text>
        </View>
      </View>
    </View>
  );
};

export default SingleLinkView;
