import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import { HelveticaBold, ReturnButton } from "../theme/genericComponents";
import HeaderWithBackButton from "../components/HeaderWithBackBtn";
import { useRoute } from "@react-navigation/native";
import { fetchFolderDataById } from "./SingleFolderView";
import { COLORS, SPACE } from "../theme/constants";
import StoralinkSwiper from "../components/StoralinkSwiper";
import { coverImagesMap } from "../assets/imageAssetsPrerequire";

const SingleLinkView = () => {
  const {
    setCurrentFocusedFolder,
    navigator,
    screenHeight,
    screenWidth,
    dispatchFolderCache,
    folderCache,
    defaultImage,
    placeHolder,
  } = useContext(GlobalContext);

  const route = useRoute();
  const [selectedLinkSeq, setSelectedLinkSeq] = useState(route.params.linkSeq);
  const folder = fetchFolderDataById(route.params?.id, folderCache);
  const links = folder.links;
  console.log('current links', links)
  const linkOnScroll = (direction: string) => {
    console.log("triggered scroll", direction);
    if (direction == "left") {
      setSelectedLinkSeq(selectedLinkSeq - 1);
      console.log("decrease seq");
    } else {
      setSelectedLinkSeq(selectedLinkSeq + 1);
    }
  };
  return (
    <SafeAreaView>
      <StoralinkSwiper
        onCardScolled={(direction: string) => linkOnScroll(direction)}
        style={{
          width: screenWidth,
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          height: screenHeight * 0.35,
          zIndex: 10,
          borderRadius: SPACE.nativeRoundMd,
        }}
      >
        {links.map((link, index) => (
          <View
            key={index}
            style={{
              backgroundColor: COLORS.white,
              padding: SPACE.nativeMd,
              borderRadius: SPACE.nativeRoundMd,
              height: screenHeight * 0.35,
              width: "100%",
            }}
          >
            <View style={{ marginVertical: SPACE.nativeSm }}>
              <Text>@Some_Auther</Text>
            </View>
           
            <Image
              style={{
                width: "100%",
                height: screenHeight * 0.3, // Set a fixed height
                borderRadius: SPACE.nativeRoundMd,
              }}
              source={
                !link.imgUrl ||
                (typeof link.imgUrl === "string" && link.imgUrl.length === 0)
                  ? // precheck if the imgUrl is not filled out, we use default value if not
                    placeHolder
                  : typeof link.imgUrl === "number" // Check if imgUrl is a number
                  ? link.imgUrl
                  : link.imgUrl.includes("cover_")
                  ? coverImagesMap[link.imgUrl as string]
                  : { uri: link.imgUrl as string }
              }
              //source={link.imgUrl ? link.imgUrl : placeHolder}
            />
          </View>
        ))}
      </StoralinkSwiper>

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

          <View style={{ marginTop: screenHeight * 0.35 }}>
            <Text style={{ marginTop: 30 }}>
              {selectedLinkSeq + 1} / {links.length}
            </Text>
            <HelveticaBold style={{ marginTop: 30 }}>
              {links[selectedLinkSeq].title}
            </HelveticaBold>
            <HelveticaBold style={{ marginTop: 30 }}>
              {links[selectedLinkSeq].description}
            </HelveticaBold>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleLinkView;
