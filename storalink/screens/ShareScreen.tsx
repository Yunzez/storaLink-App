import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
import { AGeneralTextInput, RetrunButton } from "../theme/genericComponents";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import LoadingScreen from "../components/LoadingScreen";
import { getLinkPreview } from "link-preview-js";

const ShareScreen = () => {
  const defaultImage = require("../assets/img/YellowIcon.png");
  const { folderCache } = useContext(GlobalContext);
  const [sharedData, setSharedData] = useState("");
  const [linkMetadata, setLinkMetadata] = useState(null);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('')

  useEffect(() => {
    try {
      ShareMenuReactView.data().then((data) => {
        
        console.log('current data', data)
        const link = data.data[0].data;
        setSharedData(link);
        if(data) {
            getLinkPreview(link)
          .then((metadata) => {
            console.log(metadata)
            setLinkMetadata(metadata);
            setTitle(metadata.title)
            setDescription(metadata.description)
            setImage(metadata.images[0])
            setLoading(false);

          })
          .catch((error) => {
            console.error("Error fetching link metadata:", error);
            setLoading(false);
          });
        }
        
      });
    } catch (error) {
      console.error("Error getting shared data:", error);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 5,
        marginTop: 25,
        marginHorizontal: 18,
      }}
    >
      {loading ? (
        <View style={{ justifyContent: "center", height: "100%" }}>
          <LoadingScreen />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                ShareMenuReactView.dismissExtension();
              }}
            >
              <Text style={{ fontSize: 18, color: COLORS.themeYellow }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <View style={{ width: 30, height: 30 }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={defaultImage}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                console.log("save", folderCache, sharedData);
                // ShareMenuReactView.dismissExtension();
                ShareMenuReactView.continueInApp();
              }}
            >
              <Text style={{ fontSize: 18, color: COLORS.themeYellow }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", height: 100, marginTop: 40 }}>
            <View style={{ width: "60%" }}>
              <Text>Link: {sharedData}</Text>
            </View>

            <View style={{ width: "40%", height: 100, paddingHorizontal: 15 }}>
              <Image
                style={{ width: "100%", height: "100%", borderRadius: SPACE.nativeRoundMd}}
                source={image.length == 0 ? defaultImage :{ 'uri': image} }
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Link Title:</Text>
            <AGeneralTextInput
              style={{
                marginTop: 5,
                borderColor: COLORS.themeYellow,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
              value={title}
            />
          </View>
          <View style={{ marginTop: 20, minHeight: 10 }}>
            <Text>Description:</Text>
            <AGeneralTextInput
              multiline={true}
              numberOfLines={3}
              style={{
                marginTop: 5,
                borderColor: COLORS.themeYellow,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
              }}
              value={description}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Save in:</Text>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ShareScreen;
