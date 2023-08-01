import { ScrollView, View } from "native-base";
import React, { useContext } from "react";
import { TouchableOpacity, Text, SafeAreaView, TextInput } from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import { RetrunButton, AGeneralTextInput } from "../../theme/genericComponents";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACE } from "../../theme/constants";

const AddFolders = () => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
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
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              Create New Folder
            </Text>
          </View>

          <ScrollView style={{ marginTop: 30 }}>
            <View style={{ marginBottom: 20 }}>
              <Text>Folder Name *</Text>
              <AGeneralTextInput placeholder="Your most creative name here..." />
            </View>
            <View style= {{marginBottom: 20}}>
              <Text>Cover</Text>

              <TouchableOpacity>
                <View
                  style={{
                    borderColor: COLORS.darkGrey,
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderRadius: SPACE.nativeRoundMd,
                    height: 150,
                    flexDirection:'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons
                    name="image-outline"
                    size={70}
                    color={COLORS.darkGrey}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text>Description</Text>
              <AGeneralTextInput multiline={true}  numberOfLines={4} placeholder="What’s this folder about?" />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddFolders;
