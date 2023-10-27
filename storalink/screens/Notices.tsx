import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACE } from "../theme/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Notices = () => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: "90%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 10,
                borderRadius: SPACE.nativeRoundMd,
              }}
            >
              <Text style={{ fontSize: 15 }}>Your Activity</Text>
            </View>
          </View>
          <View>
            <NotificationBanner />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const NotificationBadge = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 12 }}>1</Text>
    </View>
  );
};

export const NotificationBanner = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SPACE.nativeRoundMd,
        width: "100%",
        height: 90,
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 8,
      }}
    >
      <View style={{ flexDirection: "row", width: "100%", marginStart: 40 }}>
        <Text style={{ color: COLORS.darkGrey }}>Today 9:14AM</Text>
      </View>
      <View style={{ flexDirection: "row", width: "100%", marginStart: 40 }}>
        <Text style={{ fontSize: 15 }}>You created the folder </Text>
        <Text style={{ fontWeight: "600", fontSize: 15 }}>
          Stars & Some Clouds
        </Text>
      </View>
      <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: '100%', marginEnd: 40}}>
        <TouchableOpacity >
          <Text style={{color: COLORS.themeYellow}}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notices;
