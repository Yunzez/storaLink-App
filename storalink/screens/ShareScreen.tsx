import React, { useContext } from "react";
import { SafeAreaView, Text, Image, View, TextInput } from "react-native";
import { COLORS } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
import { AGeneralTextInput } from "../theme/genericComponents";

const ShareScreen = () => {
  const defaultImage = require("../assets/img/YellowIcon.png");
  const { screenHeight } = useContext(GlobalContext);
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 5,
        marginTop: 25,
        marginHorizontal: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, color: COLORS.themeYellow }}>Cancel</Text>
        <View style={{ width: 30, height: 30 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={defaultImage}
          />
        </View>

        <Text style={{ fontSize: 18, color: COLORS.themeYellow }}>Add</Text>
      </View>
      <View style={{ flexDirection: "row", height: 100, marginTop: 40 }}>
        <View style={{ width: "60%" }}>
          <Text>
            Here is the link Here is the linkHere is the linkHere is the
            linkHere is the linkHere is the linkHere is the link
          </Text>
        </View>

        <View style={{ width: "40%", height: 100, paddingHorizontal: 15 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={defaultImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <Text>Link Title:</Text>
        <AGeneralTextInput style={{marginTop: 5, borderColor: COLORS.themeYellow, borderWidth: 1, borderRadius: 10, paddingVertical:15, paddingHorizontal: 10}}/>
      </View>
      <View style={{marginTop: 20, minHeight: 10}}>
        <Text>Description:</Text>
        <AGeneralTextInput multiline={true} numberOfLines={3} style={{marginTop: 5, borderColor: COLORS.themeYellow, borderWidth: 1, borderRadius: 10, paddingVertical:15, paddingHorizontal: 10}}/>
      </View>
      <View style={{marginTop: 20}}>
      <Text>Save in:</Text>
      </View>
    </SafeAreaView>
  );
};

export default ShareScreen;
