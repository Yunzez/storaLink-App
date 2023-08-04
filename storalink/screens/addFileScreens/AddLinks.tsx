import {View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import styled from "styled-components";
import { COLORS, SPACE } from "../../theme/constants";
import { Ionicons } from "@expo/vector-icons";
import { AGeneralTextInput, RetrunButton } from "../../theme/genericComponents";
import * as ImagePicker from "expo-image-picker";
import SearchComponent from "../../components/SearchbarComponent";
const AddLinks = () => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
  const [valid, isValid] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [image, setImage] = useState("");
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
      console.log('uri:',  result.assets[0].uri)
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    console.log('add image path')
  }, [image])
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            <Text style={{ fontSize: 18, marginTop: 5 }}>Create New Link</Text>
          </View>

          <ScrollView style={{ marginTop: 30 }}>
            <View style={{ marginBottom: 20 }}>
              <Text>Link URL *</Text>
              <AGeneralTextInput placeholder="https://..." />
            </View>
            <View style={{ marginBottom: 20, zIndex: 5 }}>
              <Text>Save Link To *</Text>
              <SearchComponent placeHolder="Search a folder"/>
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
                multiline={true}
                numberOfLines={4}
                placeholder="What’s this folder about?"
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
            >
              <Text>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddLinks;
