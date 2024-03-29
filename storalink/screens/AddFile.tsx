import React, { useContext, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import { COLORS, SPACE } from "../theme/constants";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import BottomFolder from "../assets/svgComponents/bottomNavSVG/BottomFolder";
import LogoSVG from "../assets/svgComponents/LogoSVG";
import Link from "../assets/svgComponents/Link";
import BottomAddIcon from "../assets/svgComponents/BottomAddIcon";

const AddFile = () => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
  const [update, setUpdate] = useState(false);
  const CreateButton = styled(View)`
    background-color: ${COLORS.white};
    padding-left: ${screenWidth * 0.25}px;
    padding-right: ${screenWidth * 0.25}px;
    padding-top: ${screenWidth * 0.2}px;
    padding-bottom: ${screenWidth * 0.2}px;
    border-radius: ${SPACE.roundLg};
  `;
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: screenHeight * 0.1,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Ionicons
            name="add-circle-outline"
            size={screenHeight * 0.03}
            color={COLORS.standardBlack}
          />
          <Text style={{ fontSize: 22 }}> Create New </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            height: screenHeight * 0.6,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("add_new_link");
            }}
          >
            <CreateButton
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View>
                <Link />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.themeYellow,
                  fontWeight: "500",
                }}
              >
                Link
              </Text>
            </CreateButton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("add_new_folder");
            }}
          >
            <CreateButton
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ marginEnd: 5 }}>
                <BottomFolder active={false} color={COLORS.themeYellow} />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.themeYellow,
                  fontWeight: "500",
                }}
              >
                Folder
              </Text>
            </CreateButton>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddFile;
