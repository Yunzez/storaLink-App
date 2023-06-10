import React, { useContext } from "react";
import styled from "styled-components/native";
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

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);

  const BottomNavigationContainer = styled(View)`
    height: ${screenHeight * 0.08}px;
    background-color: ${COLORS.white};
    border-radius: 100px;
    padding: 10px;
    position: absolute;
  left: 20px;
  right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${screenWidth * 0.9}px;
    flex-direction: row;
    border: 2px solid ${COLORS.darkGrey};
    box-shadow: 0 19px 38px rgba(0,0,0,0.30);

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
          let iconName = "home";
          switch (name) {
            case "Home":
              iconName = "home";
              break;
            case "Files":
              iconName = "document";
              break;
            case "Friends":
              iconName = "people";
              break;
            case "Settings":
              iconName = "settings";
              break;
            default:
              break;
          }
          console.log(options, descriptors[route.key]);
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
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{marginLeft: 10, marginRight: 10}}
            >
              <Ionicons
                name={isFocused ? iconName as typeof name: iconName + "-outline" as typeof name}
                size={
                  isFocused ? screenHeight * 0.03 * 1.2 : screenHeight * 0.03
                }
                color={isFocused ? COLORS.themeYellow : COLORS.darkGrey}
              />
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
        name="Home"
        component={HomeNavigators}
      />
      <Tab.Screen
        name="Files"
        component={Files}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
  
};

export default BottomTabNavigators;
