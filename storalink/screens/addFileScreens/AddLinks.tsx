import { Checkbox, View } from "native-base";
import React, { useContext, useEffect, useId, useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import styled from "styled-components";
import { COLORS, SPACE } from "../../theme/constants";
import { Ionicons } from "@expo/vector-icons";
import { AGeneralTextInput, RetrunButton } from "../../theme/genericComponents";
import * as ImagePicker from "expo-image-picker";
import SearchComponent, {
  searchResultType,
  searchValueType,
} from "../../components/SearchbarComponent";
import { LinkViewProps } from "../../Test/MockData";
import { SocialMediaSrc, isValidUrl } from "../../utils";
import { postCreateLink, statusType } from "../../hooks/usePostFiles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import placeholder from "../../assets/mockImg/placeholder.png";
import { StyledCheckbox } from "../Login";
import { getLinkPreview } from "link-preview-js";
const AddLinks = () => {
  const {
    navigator,
    screenHeight,
    screenWidth,
    folderCovers,
    folderCache,
    dispatchFolderCache,
    dispatchRecentLinkCache,
    backendLink,
    user,
  } = useContext(GlobalContext);
  const [valid, setValid] = useState(false);
  const [image, setImage] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(-1);
  const [selectedFolderName, setSelectedFolderName] = useState(placeholder);
  const [status, setStatus] = useState<statusType>(statusType.initialize);
  const [url, setUrl] = useState("");
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const desRef = useRef();

  const [autoFill, setAutoFill] = useState(false);
  const LoadingContainer = styled(View)`
    align-items: center;
    justify-content: center;

    height: ${screenHeight * 0.8}px;
  `;

  const LoadingText = styled(Text)`
    margin-top: 20px;
    font-size: 20px;
    color: ${COLORS.themeYellow};
  `;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      delete result.cancelled;
      //   console.log(result);
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    console.log("add image path");
    console.log("alter selected folder id", selectedFolder);
  }, [image, selectedFolder]);

  useEffect(() => {
    selectedFolder != -1 && url.length != 0 ? setValid(true) : setValid(false);
    console.log("update folderCovers", selectedFolder);
  }, [selectedFolder, url]);
  /**
   *
   * @param value a string that is the value of user input
   * @returns a map of string: searchResultType, the searchResultType comes with a onClick method that is essetinal
   */
  const searchAlgorithm = (value: string): Map<string, searchResultType> => {
    console.log("run search", value);
    const retMap = new Map();
    if (!folderCache) {
      retMap.set("You have no folder yet, go create your first folder", {
        value: "no val",
        onClick: () => {},
        valueType: searchValueType.noValue,
      });
      return retMap;
    }
    for (const cover of folderCache) {
      console.log("run search algorithm: ", cover);
      if (cover.name?.includes(value)) {
        retMap.set(cover.name, {
          onClick: () => {
            console.log(cover.id);
            setSelectedFolder(cover.id as number);
            setSelectedFolderName(cover.name);
          },
        });
      }
    }
    console.log("searching", retMap.size);
    if (retMap.size === 0) {
      retMap.set("There is no result", { onClick: () => {} });
    }
    console.log("search result", retMap);
    return retMap;
  };

  const onCreateLink = async () => {
    console.log(description);
    setStatus(statusType.creating);
    if (selectedFolder == -1) {
      return;
    }
    const newLink: LinkViewProps = {
      title: url,
      linkUrl: url,
      socialMediaType: SocialMediaSrc.INS,
      imgUrl: image,
    };
    console.log("save to folder with id of ", selectedFolder);
    const completeLink = await postCreateLink(
      newLink,
      backendLink,
      user.id,
      selectedFolder,
      description
    );
    console.log("get complete link", completeLink);
    dispatchFolderCache({
      type: "ADD_LINK",
      folderId: selectedFolder,
      link: completeLink,
    });

    dispatchRecentLinkCache({
      type: "ADD",
      link: completeLink,
      folderId: selectedFolder,
    });

    setStatus(statusType.finished);
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {status == statusType.initialize && (
          <View style={{ width: screenWidth * 0.8 }}>
            <View style={{ position: "absolute" }}>
              <RetrunButton
                onPress={() => {
                  navigator.navigate("add_main");
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color={COLORS.standardBlack}
                />
              </RetrunButton>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontSize: 18, marginTop: 5 }}>
                Create New Link
              </Text>
            </View>

            <ScrollView style={{ marginTop: 30 }}>
              <View style={{ marginBottom: 10 }}>
                <Text>Link URL *</Text>
                <AGeneralTextInput
                  placeholder="https://..."
                  onChangeText={(text: string) => {
                    setUrl(text);
                  }}
                />
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <StyledCheckbox
                  style={{ marginRight: 6 }}
                  disabled={false}
                  value={autoFill}
                  onValueChange={async (newValue) => {
                    setAutoFill(newValue)
                    console.log('is url valid? ',isValidUrl(url), url)
                    if(isValidUrl(url)){
                      const previewInfo = await getLinkPreview(url.toLowerCase());
                      console.log('preview, ', previewInfo)
                    }
                  }}
                  color={autoFill ? COLORS.themeYellow : undefined}
                />
                <Text>Auto-fill info using URL</Text>
              </View>

              <View style={{ marginBottom: 20, zIndex: 5 }}>
                <Text>Save Link To *</Text>
                <SearchComponent
                  placeHolder="Search a folder"
                  algorithm={searchAlgorithm}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text>ThumbNail</Text>

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
                    {image.length == 0 ? (
                      <Ionicons
                        name="image-outline"
                        size={70}
                        color={COLORS.darkGrey}
                      />
                    ) : (
                      <Image
                        source={{ uri: image }} // Use the uri property to show the selected image
                        style={{ height: 100, width: 100 }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <Text>Description</Text>
                <AGeneralTextInput
                  value={description}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="What’s this folder about?"
                  onChangeText={(text: string) => {
                    setDescription(text);
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: valid ? COLORS.themeYellow : COLORS.darkGrey,
                  borderRadius: SPACE.nativeRoundMd,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 15,
                  paddingBottom: 15,
                  marginTop: 20,
                }}
                onPress={() => {
                  onCreateLink();
                }}
              >
                <Text>Create</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        {status == statusType.creating && (
          <LoadingContainer>
            <ActivityIndicator size="large" color={COLORS.themeYellow} />
            <LoadingText>status...</LoadingText>
          </LoadingContainer>
        )}
        {status == statusType.finished && (
          <LoadingContainer>
            <Text style={{ fontSize: 18 }}>
              You just created the new link in folder:
            </Text>
            <Text style={{ fontSize: 22 }}>{selectedFolderName}</Text>
            <TouchableOpacity
              onPress={() => {
                navigator.navigate("Home");
                setStatus(statusType.initialize);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0, // Reset stack to the first screen
                    routes: [
                      { name: "add_main" }, // Replace 'MainRoute' with the main route's name
                      { name: "add_main" }, // Replace 'TargetScreen' with the screen you want to navigate to
                    ],
                  })
                );
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
                navigator.navigate("Home");
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
              <Text style={{ fontSize: 15 }}>
                Go to the {selectedFolderName}
              </Text>
            </TouchableOpacity>
          </LoadingContainer>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddLinks;
