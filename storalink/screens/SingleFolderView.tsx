import React, { useContext, useEffect } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
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
import placeHolder from "../assets/mockImg/placeholder.png";
import { hexToRGBA } from "../utils";
export const SingleFolderView = () => {
  const { currentFocusedFolder, screenHeight } = useContext(GlobalContext);
  console.log(currentFocusedFolder.id);
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
            width={"100%"}
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
              style={{ flex: 1, width: "100%", height: screenHeight * 0.2 }}
            >
              <LinearGradient
                colors={[
                  hexToRGBA(COLORS.white, 0.5),
                  hexToRGBA(COLORS.themeYellow, 0.5),
                ]} // set your gradient colors
                style={{ flex: 1, width: "100%", height: "100%" }} // make it take up the full space of the parent
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
                      <Text fontSize="lg" marginRight={3} bold color={COLORS.white}>
                        {currentFocusedFolder.id}: {currentFocusedFolder.name}
                      </Text>
                      <Avatar
                        source={currentFocusedFolder.thumbNailUrl}
                        alt="Folder thumbnail"
                        size="sm"
                        width={25}
                        height={25}
                        borderColor={COLORS.darkGrey}
                        borderWidth={1}
                      />
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
            <Text fontSize="md" color={COLORS.darkGrey}>
              {currentFocusedFolder.description ?? "no description"}
            </Text>

            <VStack space={2}>
              {currentFocusedFolder.links &&
              currentFocusedFolder.links.length > 0 ? (
                currentFocusedFolder.links.map((link, index) => (
                  <Box key={index} p={3} bg="gray.100" rounded="md">
                    <HStack justifyContent="space-between">
                      <Text bold>{link.title}</Text>
                      <Text>{link.socialMediaType}</Text>
                    </HStack>
                    {link.imgUrl && (
                      <Avatar
                        source={link.imgUrl}
                        alt="Link thumbnail"
                        size="md"
                        mt={2}
                      />
                    )}
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
