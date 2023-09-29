import { ScrollView, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native"; // Import ActivityIndicator from react-native
import { GlobalContext } from "../../context/GlobalProvider";
import { RetrunButton, AGeneralTextInput } from "../../theme/genericComponents";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACE } from "../../theme/constants";
import * as ImagePicker from "expo-image-picker";
import { FolderCardProps } from "../../components/FolderCard";
import styled from "styled-components";
import { postCreateFolder } from "../../hooks/usePostFiles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { coverImagesMap } from "../../assets/imageAssetsPrerequire";
import { statusType } from "../../hooks/usePostFiles";
import AddIcon from "../../assets/svgComponents/AddIcon";
import UploadImageSVG from "../../assets/svgComponents/UpdaloadImageSVG";
const AddFolders = () => {
  const {
    navigator,
    screenHeight,
    screenWidth,
    folderCovers,
    dispatchFolderCovers,
    dispatchFolderCache,
    backendLink,
    user,
  } = useContext(GlobalContext);

  // coverImages.js
  const assetPath = "../../assets/coverImg/";

  const [valid, setValid] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [des, setDes] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();
  const [status, setStatus] = useState<statusType>(statusType.initialize);
  const [newFolderId, setNewFolderId] = useState(-1);
  const [selectedCover, setSelectedCover] = useState(0);
  const LoadingContainer = styled(View)`
    align-items: center;
    justify-content: center;

    height: ${screenHeight * 0.8};
  `;

  const LoadingText = styled(Text)`
    margin-top: 20px;
    font-size: 20px;
    color: ${COLORS.themeYellow};
  `;

  const newFolderObject: FolderCardProps = {
    id: -1,
    title: folderName,
    imgUrl: customImage == "" ? `cover_${selectedCover + 1}` : customImage,
    desc: des,
    linksNumber: 0,
    onClick: () => {
      console.log("clicked card named: ", folderName);
    },
  };

  const resetFileRoute = () => {
    setValid(false);
    setDes("");
    setFolderName("");
    setCustomImage("");
    setNewFolderId(-1);
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Reset stack to the first screen
        routes: [
          { name: "add_main" }, // Replace 'MainRoute' with the main route's name
          { name: "add_main" }, // Replace 'TargetScreen' with the screen you want to navigate to
        ],
      })
    );
  };

  const createFolder = async () => {
    console.log("run create folder");
    setStatus(statusType.creating);
    try {
      console.log("creating folder: ", newFolderObject);
      const folderWithId = await postCreateFolder(
        newFolderObject,
        backendLink,
        user.id
      );
      console.log("Received folderWithId:", folderWithId);
      setNewFolderId(folderWithId.id ?? -1);
      dispatchFolderCovers({ type: "ADD", folder: folderWithId });
    } catch (error) {
      console.error("Error creating folder:", error);
    }

    console.log("finished creating folder");
    setStatus(statusType.finished);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      delete result.cancelled;
      console.log(result);
      setCustomImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    folderName.length > 1 ? setValid(true) : setValid(false);
    console.log("update folderCovers", folderCovers);
  }, [folderName, folderCovers]);

  useEffect(() => {
    console.log("detect folder changed: ", folderCovers);
    if (update) setUpdate(false);
  }, [update, folderCovers]);

  const coverImagesArray = Object.values(coverImagesMap);
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: screenWidth * 0.8 }}>
          {status == statusType.creating ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color={COLORS.themeYellow} />
              <LoadingText>status...</LoadingText>
            </LoadingContainer>
          ) : status == statusType.initialize ? (
            <View>
              <View style={{ position: "absolute", zIndex: 99 }}>
                <RetrunButton
                  onPress={() => {
                    navigator.navigate("add_main");
                  }}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={25}
                    color={COLORS.standardBlack}
                  />
                </RetrunButton>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 18, marginTop: 5 }}>
                  Create New Folder
                </Text>
              </View>

              <ScrollView style={{ marginTop: 30 }}>
                <View style={{ marginBottom: 20 }}>
                  <Text>Select a cover *</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {coverImagesArray.map((cover, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          console.log("selecting ", index);
                          setSelectedCover(index);
                          if (index == 9) {
                            pickImage();
                          }
                          console.log("click");
                        }}
                      >
                        {cover == "your own" ? (
                          <View
                            style={{
                              flexDirection: "row",
                              width: screenWidth * 0.38,
                              height: screenWidth * 0.12,
                              borderRadius: 50,
                              margin: 2,
                              marginVertical: 5,
                              borderWidth: 1,
                              borderStyle: "dashed",
                              borderColor:
                                selectedCover == index
                                  ? COLORS.themeYellow
                                  : COLORS.standardBlack,
                              alignItems: "center",
                            }}
                          >
                            {customImage == "" ? (
                              <View
                                style={{
                                  borderRadius: 100,
                                  borderWidth: 1,
                                  marginHorizontal: 6,
                                }}
                              >
                                <AddIcon
                                  height={String(screenWidth * 0.07)}
                                  width={String(screenWidth * 0.07)}
                                  fill="black"
                                  color="black"
                                />
                              </View>
                            ) : (
                              <View
                                style={{
                                  borderWidth: 2,
                                  borderColor: COLORS.themeYellow,
                                  borderTopLeftRadius: 50,
                                  borderBottomLeftRadius: 50,
                                  width: screenWidth * 0.25,
                                  height: screenWidth * 0.11,
                                  marginVertical: 5,
                                  marginEnd: 5,
                                  marginStart: 2,
                                }}
                              >
                                <Image
                                  alt={"custom image selection"}
                                  source={{ uri: customImage }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderTopLeftRadius: 50,
                                    borderBottomLeftRadius: 50,
                                  }}
                                />
                              </View>
                            )}

                            {customImage == "" ? (
                              <Text style={{ fontSize: 13 }}>
                                Upload Costom
                              </Text>
                            ) : (
                              <UploadImageSVG width="30" height="30" />
                            )}
                          </View>
                        ) : (
                          <Image
                            alt={"custom image selection"}
                            source={cover}
                            style={{
                              width: screenWidth * 0.12,
                              height: screenWidth * 0.12,
                              borderRadius: 50,
                              marginHorizontal: 2,
                              marginVertical: 5,
                              borderWidth: 2,
                              borderColor:
                                selectedCover == index
                                  ? COLORS.themeYellow
                                  : COLORS.standardBlack,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text>Folder Name *</Text>
                  <AGeneralTextInput
                    onChangeText={(text: string) => {
                      setFolderName(text);
                    }}
                    placeholder="Your most creative name here..."
                  />
                </View>
                {/* <View style={{ marginBottom: 20 }}>
                  <Text>Cover</Text>

                  <TouchableOpacity onPress={pickImage}>
                    <View
                      style={{
                        borderColor: COLORS.darkGrey,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderRadius: SPACE.nativeRoundMd,
                        height: 150,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {customImage.length == 0 ? (
                        <Ionicons
                          name="image-outline"
                          size={70}
                          color={COLORS.darkGrey}
                        />
                      ) : (
                        <Image
                          alt="user image"
                          source={{ uri: customImage }} // Use the uri property to show the selected image
                          style={{ height: 100, width: 100 }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View> */}

                <View>
                  <Text>Description</Text>
                  <AGeneralTextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder="What’s this folder about?"
                    onChangeText={(text: string) => {
                      setDes(text);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: valid
                      ? COLORS.themeYellow
                      : COLORS.darkGrey,
                    borderRadius: SPACE.nativeRoundMd,
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginTop: 20,
                  }}
                  onPress={() => createFolder()}
                >
                  <Text>Create</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <LoadingContainer>
              <Text style={{ fontSize: 18 }}>
                You just created the new folder:
              </Text>
              <Text style={{ fontSize: 22 }}>{folderName}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigator.navigate("Home");
                  setStatus(statusType.initialize);
                  resetFileRoute();
                }}
                style={{
                  width: screenWidth * 0.7,
                  borderRadius: SPACE.nativeRoundMd,
                  backgroundColor: COLORS.darkGrey,
                  padding: 15,
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 15 }}>Back to Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetFileRoute();
                  newFolderId > 0
                    ? navigator.navigate("SingleFolderView", {
                        name: folderName,
                        id: newFolderId,
                      })
                    : navigator.navigate("Home");
                  setStatus(statusType.initialize);
                }}
                style={{
                  width: screenWidth * 0.7,
                  borderRadius: SPACE.nativeRoundMd,
                  backgroundColor: COLORS.themeYellow,
                  padding: 15,
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 15 }}>Go to {folderName}</Text>
              </TouchableOpacity>
            </LoadingContainer>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddFolders;
