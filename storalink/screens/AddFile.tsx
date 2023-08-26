import React, { useContext, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import { COLORS, SPACE } from "../theme/constants";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const AddFile = () => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
    const [update, setUpdate] = useState(false)
  const CreateButton = styled(View)`
    background-color: ${COLORS.lightOrange};
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
        <View style={{flexDirection:'row', justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}> Create New </Text>
        <Ionicons
          name="add-circle-outline"
          size={screenHeight * 0.03}
          color={COLORS.standardBlack}
        />
        </View>
      
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            height: screenHeight * 0.6,
          }}
        >
          <TouchableOpacity onPress={() => {navigator.navigate('add_new_link')}}>
            <CreateButton>
              <Text style={{ fontSize: 20 }}>Link</Text>
            </CreateButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigator.navigate('add_new_folder')}}>
            <CreateButton>
              <Text style={{ fontSize: 20 }}>Folder</Text>
            </CreateButton>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddFile;
