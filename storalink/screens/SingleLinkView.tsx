import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import { HelveticaBold, RetrunButton } from "../theme/genericComponents";
import HeaderWithBackButton from "../components/HeaderWithBackBtn";
import { useRoute } from "@react-navigation/native";
import { fetchFolderDataById } from "./SingleFolderView";
import { COLORS, SPACE } from "../theme/constants";

const SingleLinkView = () => {
  const {
    setCurrentFocusedFolder,
    navigator,
    screenHeight,
    screenWidth,
    dispatchFolderCache,
    folderCache,
    defaultImage,
    placeHolder
  } = useContext(GlobalContext);

  const route = useRoute();
  const [selectedLinkSeq, setSelectedLinkSeq] = useState(route.params.linkSeq);
  const folder = fetchFolderDataById(route.params?.id, folderCache);
  const links = folder.links;

  console.log("got folder", folder, selectedLinkSeq);
  return (
    <SafeAreaView>
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
            navigateOptions={{ id: route.params?.id }}
          />

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: SPACE.nativeMd,
                borderRadius: SPACE.nativeRoundMd,
                height: screenHeight * 0.3
              }}
            >
              <View style={{ marginVertical: SPACE.nativeSm }}>
                <Text>@Some_Auther</Text>
              </View>

              <Image
                style={{ flex: 1, width: "100%", height: 'auto', borderRadius: SPACE.nativeRoundMd }}
                source={
                  links[selectedLinkSeq].imgUrl
                    ? links[selectedLinkSeq].imgUrl
                    : placeHolder
                }
              />
            </View>
            <Text style={{marginTop: 30}}>
              {selectedLinkSeq + 1} / {links.length}
            </Text>
            <HelveticaBold style={{marginTop: 30 }}>{links[selectedLinkSeq].title}</HelveticaBold>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleLinkView;
