import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Box, Text, VStack, Avatar, HStack, Flex } from "native-base";
import { GlobalContext } from "../context/GlobalProvider";
import LoadingScreen from "../components/LoadingScreen";
import { COLORS, SPACE } from "../theme/constants";
import { LinearGradient } from "expo-linear-gradient";
import ToggleModalButton from "../components/ToggleModalButton";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import BottomModal, { ModalDataProps } from "../components/BottomModal";
import placeHolder from "../assets/mockImg/mockAvatar0.png";

import { hexToRGBA } from "../utils";
import OutLinedButton from "../components/OutLinedButton";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
export const SingleFolderView = () => {
  const [blockView, setBlockView] = useState(false);
  const { currentFocusedFolder, screenHeight, screenWidth } =
    useContext(GlobalContext);
  console.log(currentFocusedFolder.id, placeHolder, "check place holder");
  useEffect(() => {
    console.log("single folder links", currentFocusedFolder.links);
  }, [currentFocusedFolder]);

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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {currentFocusedFolder.id ? (
        <ScrollView>
          <Box
            width={screenWidth}
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              letterSpacing: "lg",
            }}
          >
            <ImageBackground
              source={
                currentFocusedFolder.links
                  ? (currentFocusedFolder.links[0].imgUrl as string)
                  : "../assets/mockImg/placeholder.png"
              }
              style={{ width: screenWidth, height: screenHeight * 0.2 }}
            >
              <LinearGradient
                colors={[
                  hexToRGBA(COLORS.white, 0.5),
                  hexToRGBA(COLORS.themeYellow, 0.5),
                ]} // set your gradient colors
                style={{ flex: 1, width: screenWidth, height: "100%" }} // make it take up the full space of the parent
              >
                <Box
                  flex={1} // Fill the container
                  justifyContent="flex-end" // Align children to the bottom
                >
                  <Flex
                    direction="row"
                    px={SPACE.nativeSm}
                    mb="2.5"
                    mt="1.5"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex
                      direction="row"
                      px={SPACE.nativeSm}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      {" "}
                      <Text
                        fontSize="lg"
                        marginRight={3}
                        bold
                        color={COLORS.white}
                      >
                        {currentFocusedFolder.id}: {currentFocusedFolder.name}
                      </Text>
                      <Flex flexDirection={"row"}>
                        <Avatar
                          source={require("../assets/mockImg/mockAvatar0.png")}
                          size="sm"
                          style={{ marginRight: -10 }}
                          borderColor={COLORS.white}
                          borderWidth={1}
                          bg={COLORS.lightOrange}
                        />
                        <Avatar
                          source={require("../assets/mockImg/mockAvatar1.png")}
                          size="sm"
                          style={{ marginRight: -10 }}
                          borderColor={COLORS.white}
                          borderWidth={1}
                          bg={COLORS.lightOrange}
                        />
                        <Avatar
                          source={require("../assets/mockImg/mockAvatar0.png")}
                          size="sm"
                          style={{ marginRight: -10 }}
                          borderColor={COLORS.white}
                          borderWidth={1}
                          bg={COLORS.lightOrange}
                        />
                      </Flex>
                    </Flex>

                    <ToggleModalButton
                      activeSource={moreIconActive}
                      inactiveSource={moreIcon}
                    />
                  </Flex>
                </Box>
              </LinearGradient>
            </ImageBackground>
          </Box>
          <Box bg="white" px={4} rounded={SPACE.nativeRoundLg}>
            <Text fontSize="md" my={3} color={COLORS.darkGrey}>
              {currentFocusedFolder.description ?? "no description"}
            </Text>
            <Flex flexDirection={"row"} justifyContent={"space-between"} mb={3}>
              <Flex flexDirection={"row"}>
                <OutLinedButton
                style={{marginRight: 5}}
                  onClick={() => {
                    console.log("hello");
                  }}
                  text="Sort By"
                />
                <OutLinedButton
                  onClick={() => {
                    console.log("hello");
                  }}
                  text="Add item"
                />
              </Flex>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: blockView
                      ? COLORS.white
                      : COLORS.themeYellow,
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
                    backgroundColor: blockView
                      ? COLORS.themeYellow
                      : COLORS.white,
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
            </Flex>

            <VStack space={2}>
              {/* TODO: implement black view } */}
              {currentFocusedFolder.links &&
              currentFocusedFolder.links.length > 0 ? (
                currentFocusedFolder.links.map((link, index) => (
                  <Box key={index} p={1} bg="gray.100" rounded="md">
                    <HStack justifyContent="start">
                      {link.imgUrl && (
                        <Image
                          source={link.imgUrl}
                          style={{
                            width: 55,
                            height: 40,
                            borderRadius: SPACE.nativeRoundSm,
                          }}
                        />
                      )}
                      <VStack marginLeft={4}>
                        <Text >{link.title}</Text>
                        <Text color={COLORS.darkGrey}>From {link.socialMediaType}</Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text>No Links in this folder</Text>
              )}
            </VStack>
          </Box>
        </ScrollView>
      ) : (
        <LoadingScreen loadingText="Loading your folder" />
      )}
      <BottomModal
        data={modalData}
        height={screenHeight * 0.5}
        header={{ name: "Pinned Folders Section", icon: moreIconActive }}
      />
    </SafeAreaView>
  );
};

export default SingleFolderView;
