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
import { FolderProps, GlobalContext } from "../context/GlobalProvider";
import LoadingScreen from "../components/LoadingScreen";
import { COLORS, SPACE } from "../theme/constants";
import { LinearGradient } from "expo-linear-gradient";
import ToggleModalButton from "../components/ToggleModalButton";
import moreIcon from "../assets/icon/pinnedFolderOptions.png";
import moreIconActive from "../assets/icon/pinnedFolderOptionsActive.png";
import BottomModal, { ModalDataProps } from "../components/BottomModal";
import placeHolder from "../assets/mockImg/mockAvatar0.png";

import { hexToRGBA, isLocalPath } from "../utils";
import OutLinedButton from "../components/OutLinedButton";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
import { useRoute } from "@react-navigation/native";
import placeholder from "../assets/mockImg/placeholder.png";
import emptyFolder from "../assets/icon/emptyFolder.png";
import MoreOptionsButtonDropDown from "../components/MoreOptionsButtonDropDown";
export const SingleFolderView = () => {
  const [blockView, setBlockView] = useState(false);
  const [currData, setCurrData] = useState<FolderProps | undefined>(undefined);
  const { setCurrentFocusedFolder, navigator, screenHeight, screenWidth, dispatchFolderCache , folderCache} =
    useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  console.log(currData?.id ?? "no id", "check place holder");

  const route = useRoute();

  const fetchFolderDataById = (id: string | number) => {
    console.log("folder data", folderCache);
    if (!folderCache) {
      return null;
    }
    const target = folderCache.find((value) => {
      return value.id === Number(id);
    });

    console.log("target value", target);
    return target;
  };

  

  useEffect(() => {
    if (route.params) {
      const folderData = fetchFolderDataById(route.params.id);
      console.log("route name", route.params.id, folderData);
      if (folderData) {
        setCurrData(folderData);
        setIsLoading(false);
      } else {
        console.error("folder data is null");
      }
    }

    // navigator.navigate('SingleFolderView', {name: folderData?.name})
    // setCurrentFocusedFolder(folderData as FolderProps);
  }, [folderCache]);

  const modalData: ModalDataProps[] = [
    {
      name: "Manage Pinned Folders",
      onClick: () => {
        console.log("click single folder");
      },
    },
    {
      name: "Create New Pinned Folder",
      onClick: () => {
        console.log("test3");
      },
    },
    {
      name: "View All Pinned Folders",
      onClick: () => {
        console.log("test3");
      },
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {isLoading && <LoadingScreen />}

      {currData ? (
        <ScrollView style={{ minHeight: screenHeight * 0.5 }}>
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
                currData.thumbNailUrl
                  ? isLocalPath(currData.thumbNailUrl)
                    ? currData.thumbNailUrl
                    : { uri: currData.thumbNailUrl }
                  : require("../assets/mockImg/placeholder.png")
              }
              style={{
                width: screenWidth,
                height: screenHeight * 0.2,
              }}
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
                        {currData.id}: {currData.name}
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
              {currData.description ?? "no description"}
            </Text>
            <Flex flexDirection={"row"} justifyContent={"space-between"} mb={3}>
              <Flex flexDirection={"row"}>
                <OutLinedButton
                  style={{ marginRight: 5 }}
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

              {currData.links && currData.links.length > 0 ? (
                currData.links.map((link, index) => (
                  <Box key={index} p={2} bg="gray.100" rounded="md">
                    <HStack justifyContent="space-between" alignItems={"center"}>
                      <HStack justifyContent="space-between">
                        {link.imgUrl?.length === 0 ? (
                          // precheck if the imgUrl is not filled out, we use default value if not
                          <Image
                            source={placeholder as ImageSourcePropType}
                            style={{
                              width: 55,
                              height: 40,
                              borderRadius: SPACE.nativeRoundSm,
                            }}
                          />
                        ) : link.imgUrl && isLocalPath(link.imgUrl) ? (
                          <Image
                            source={link.imgUrl as ImageSourcePropType}
                            style={{
                              width: 55,
                              height: 40,
                              borderRadius: SPACE.nativeRoundSm,
                            }}
                          />
                        ) : (
                          <Image
                            source={{ uri: link.imgUrl }}
                            style={{
                              width: 55,
                              height: 40,
                              borderRadius: SPACE.nativeRoundSm,
                            }}
                          />
                        )}

                        <VStack marginLeft={4}>
                          <Text>{link.title}</Text>
                          <Text color={COLORS.darkGrey}>
                            From {link.socialMediaType}
                          </Text>
                        </VStack>
                      </HStack>

                      <MoreOptionsButtonDropDown
                        option={[
                          {
                            name: "Delete",
                            onClick: () => {
                              console.log("Delete this", "folder id: ", route.params?.id, "link id: ", link.id, );
                                dispatchFolderCache({type: 'REMOVE_LINK', linkId: link.id ?? -1, folderId: route.params?.id })
                            },
                          },
                          {
                            name: "Share",
                            onClick: () => {
                              console.log("Share this");
                            },
                          },
                        ]}
                      />
                    </HStack>
                  </Box>
                ))
              ) : (
                <View
                  style={{
                    height: screenHeight * 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={emptyFolder} />
                  <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    This Folder is empty!
                  </Text>
                  <TouchableOpacity onPress={() => [
                    navigator.navigate('Add', { screen: 'add_new_link' })
                  ]}>
                    <Text
                      style={{
                        color: COLORS.themeYellow,
                        textDecorationLine: "underline",
                      }}
                    >
                      Add your first link!
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </VStack>
          </Box>
        </ScrollView>
      ) : (
        <View style={{ height: screenHeight * 0.5 }}>
          <Text>The folder cannot be loaded rn, pls try again later</Text>
        </View>
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
