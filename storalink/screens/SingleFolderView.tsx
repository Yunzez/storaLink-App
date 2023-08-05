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

import { hexToRGBA } from "../utils";
import OutLinedButton from "../components/OutLinedButton";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
import { useRoute } from "@react-navigation/native";
export const SingleFolderView = () => {
    const {folderCache} = useContext(GlobalContext)
  const [blockView, setBlockView] = useState(false);
  const [currData, setCurrData] = useState<FolderProps | undefined>(undefined)
  const {
    setCurrentFocusedFolder,
    screenHeight,
    screenWidth,
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  console.log(
    currData?.id ?? "no id",
    placeHolder,
    "check place holder"
  );

  const route = useRoute();

  const fetchFolderDataById = (id: string | number) => {
    if(!folderCache) {
        return null
    }
    const target = folderCache.find((value) => {
        return value.id === Number(id);
      })
      
      console.log('target value', target)
      return target;

   
  }

  useEffect(() => {
    if(route.params){
        const folderData =  fetchFolderDataById(route.params.id);
        console.log('route name',route.params.id)
        if (folderData) {
            setCurrData(folderData)
          setIsLoading(false);
        } else {
            console.error('folder data is null')
        }
    }
   
    // navigator.navigate('SingleFolderView', {name: folderData?.name})
    // setCurrentFocusedFolder(folderData as FolderProps);
   
  }, []);

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
      {isLoading && <LoadingScreen />}

      {currData ? (
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
                currData.links
                  ? (currData.links[0].imgUrl as string)
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
              {currData.links &&
              currData.links.length > 0 ? (
                currData.links.map((link, index) => (
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
                        <Text>{link.title}</Text>
                        <Text color={COLORS.darkGrey}>
                          From {link.socialMediaType}
                        </Text>
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
        <Text>The folder cannot be loaded rn, pls try again later</Text>
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
