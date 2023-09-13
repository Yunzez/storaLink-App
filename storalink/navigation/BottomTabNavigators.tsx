import React, { useContext } from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Files from "../screens/Files";
import Friends from "../screens/Friends";
import Test from "../screens/Test";
import HomeNavigators from "./HomeNavigators";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACE } from "../theme/constants";
import { BlurView } from "expo-blur";
import { TouchableOpacity, View, Text } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";
import SettingNavigators from "./SettingNavigators";
import AddFile from "../screens/AddFile";
import AddFilesNavigators from "./AddFileNavigators";
import BottomAddIcon from "../assets/icon/BottomAdd.png";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);

  const BottomNavigationContainer = styled(View)`
    height: ${screenHeight * 0.09}px;
    background-color: ${COLORS.white};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 8px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    flex-direction: row;

    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3);
  `;

  return (
    <BlurView
      intensity={30}
      tint="light"
      style={{
        display: "flex",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        height: screenHeight * 0.1,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigationContainer>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const name = descriptors[route.key].route.name;
          let useIcon = true;
          let iconName = "home";
          let showText = true;
          switch (name) {
            case "Home":
              iconName = "home";
              break;
            case "Files":
              iconName = "folder-open";
              break;
            case "Friends":
              iconName = "people";
              break;
            case "Settings":
              iconName = "settings";
              break;
            case "Add":
              useIcon = false;
              showText = false;
              break;
            default:
              break;
          }

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel()
              : options.title !== undefined
              ? options.title()
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                marginLeft: 10,
                marginRight: 10,
                alignItems: "center",
                transform:
                  isFocused && name === "Add" ? [{ translateY: -10 }] : [],
              }}
            >
              {useIcon ? (
                <Ionicons
                  name={
                    isFocused
                      ? (iconName as typeof name)
                      : ((iconName + "-outline") as typeof name)
                  }
                  size={
                    isFocused ? screenHeight * 0.03 * 1.2 : screenHeight * 0.03
                  }
                  color={isFocused ? COLORS.themeYellow : COLORS.darkGrey}
                />
              ) : (
                <Image
                  source={BottomAddIcon}
                  style={{
                    width: isFocused && name === "Add" ? 75 : 60,
                    height: isFocused && name === "Add" ? 75 : 60,
                    marginBottom: isFocused && name === "Add" ? 20 : 10,
                  }}
                />
              )}

              {showText && (
                <Text style={{ fontSize: 10, color: COLORS.darkGrey }}>
                  {name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </BottomNavigationContainer>
    </BlurView>
  );
};

export const BottomTabNavigators = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeNavigators}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Files"
        component={Files}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Add"
        component={AddFilesNavigators}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Friends"
        component={Friends}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Settings"
        component={SettingNavigators}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigators;
