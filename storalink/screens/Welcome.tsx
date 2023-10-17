import React, { useState, useEffect, useContext, useRef } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  ViewStyle,
  Image,
} from "react-native";
import useNativeStorage from "../hooks/useNativeStorage";
import LoadingScreen from "../components/LoadingScreen";
import { GlobalContext } from "../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "native-base";
import { COLORS, SPACE } from "../theme/constants";
import styled from "styled-components";
const img_hand = require("../assets/welcomeImg/share_hand.png");
const img_folder = require("../assets/welcomeImg/share_folder.png");
const img_welcome = require("../assets/welcomeImg/welcome.png");
const img_external = require('../assets/welcomeImg/external.png')
const img_internal = require('../assets/welcomeImg/internal.png')
const img_organize = require('../assets/welcomeImg/organize.png')
// make a stage that is a enum with 4 stages
enum stages {
  "WELCOME",
  "LINK_EXTERNAL",
  "LINK_INTERNAL",
  "ORGANIZE",
  "SHARE",
}

const Welcome = () => {
  console.log("hand", img_hand);
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
  const { saveNativeData } = useNativeStorage();
  const [stage, setStage] = useState(stages.WELCOME);

  const circleSize = useRef(new Animated.Value(screenWidth * 0.8)).current;

  const animateCircle = () => {
    Animated.sequence([
      Animated.timing(circleSize, {
        toValue: screenWidth * 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(circleSize, {
        toValue: screenWidth * 0.8,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const circleStyle: ViewStyle = {
    borderRadius: 1000,
    shadowColor: COLORS.lightOrange,
    backgroundColor: "#ffe8bc",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  // * bounce animation

  const handleSkip = () => {
    AsyncStorage.setItem("NeedWelcome", "false");
    navigator.navigate("Login");
  };

  const handleNextStep = () => {
    animateCircle();
    // Handle your other logic like navigating etc...
    if (stage === stages.SHARE) {
      handleSkip();
    }
    setStage(stage + 1);
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: "85%" }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={() => handleSkip()}>
              <Text style={{ fontWeight: "600" }}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: screenWidth,
              top: screenHeight * 0.05,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                position: "relative", // important so zIndex takes effect
                width: "100%",
                zIndex: 1,
              }}
            >
              <Animated.View
                style={[
                  circleStyle,
                  {
                    width: circleSize,
                    height: circleSize,
                  },
                ]}
              />

              {stage === stages.WELCOME && (
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end", // aligns the text to the center of the circle, the image has some offset
                    // borderColor: 'red',
                    // borderWidth: 2,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      width: "95%",
                      height: "95%",
                      marginLeft: 10,
                      // borderColor: 'green',
                      // borderWidth: 2,
                    }}
                    source={img_welcome}
                  />
                </View>
              )}

              {stage === stages.LINK_EXTERNAL && (
                  <Image
                  style={{
                    position: "absolute",
                    width: '120%',
                    height: '85%',
                    zIndex: 5
                  }}
                  source={img_external}
                />
              )}

              {stage === stages.LINK_INTERNAL && (
                 <Image
                 style={{
                   position: "absolute",
                   width: '80%',
                   height: '80%',
                   marginLeft: '10%',
                   zIndex: 5
                 }}
                 source={img_internal}
               />
              )}

              {stage === stages.ORGANIZE && (
                
                <Image
                 style={{
                   position: "absolute",
                   width: '75%',
                   marginTop: 5,
                   height: '75%',
                   marginLeft: '10%',
                   zIndex: 5
                 }}
                 source={img_organize}
               />
              )}

              {stage === stages.SHARE && (
                <>
                  <Image
                    style={{
                      position: "absolute",
                      width: screenWidth * 0.5,
                      height: screenWidth * 0.5,
                      left: "15%",
                      top: "30%", // setting to zero so it aligns with parent
                    }}
                    source={img_hand}
                  />
                  <Image
                    style={{
                      position: "absolute",
                      width: screenWidth * 0.5,
                      height: screenWidth * 0.5,
                      left: "35%",
                      top: "10%", // setting to zero so it aligns with parent
                    }}
                    source={img_folder}
                  />
                </>
              )}
            </View>
          </View>

          <View style={{ marginTop: screenWidth * 0.9 }}>
            {stage === stages.WELCOME && (
              <View
                style={{
                  padding: 8,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TitleFont>Welcome to Storalink</TitleFont>
                </View>
                <SubTitleFont>
                  Storalink facilitates a more connected society by allowing
                  internet-savvy people to share linked resources. We can’t wait
                  to see what your contributions would be to the internet!
                </SubTitleFont>
              </View>
            )}
            {stage === stages.LINK_EXTERNAL && (
              <View
                style={{
                  padding: 8,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TitleFont>Add Links Externally</TitleFont>
                </View>
                <SubTitleFont>
                  Storalink provides a quick way for you to upload links to the
                  app! When you are on any social media, you can use the
                  platform’s share functionality to add the link to Storalink.{" "}
                </SubTitleFont>
              </View>
            )}
            {stage === stages.LINK_INTERNAL && (
              <View
                style={{
                  padding: 8,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TitleFont>Add Links Internally</TitleFont>
                </View>
                <SubTitleFont>
                  Storalink provides an internal method of adding a link in case
                  the platform you are on has no share functionality or you are
                  attempting to save a link to a website.
                </SubTitleFont>
              </View>
            )}
            {stage === stages.ORGANIZE && (
              <View
                style={{
                  padding: 8,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TitleFont>Organize Your Links</TitleFont>
                </View>
                <SubTitleFont>
                  Storalink gives unlimited control when it comes to sorting
                  your links. When you have your links, you can put change how
                  they appear within the app as well as put them in folders.
                </SubTitleFont>
              </View>
            )}
            {stage === stages.SHARE && (
              <View
                style={{
                  padding: 8,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TitleFont>Share Your Folders</TitleFont>
                </View>
                <SubTitleFont>
                  Storalink facilitates a more connected and collaborative
                  community by allowing you to share your folders with other
                  Storalink users. Together, great things will happen!
                </SubTitleFont>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.themeYellow,
              padding: 10,
              borderRadius: SPACE.nativeRoundMd,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => {
              handleNextStep();
            }}
          >
            {stage === stages.SHARE ? (
              <Text style={{ fontWeight: "800", color: COLORS.white }}>
                Get Started
              </Text>
            ) : (
              <Text style={{ fontWeight: "800", color: COLORS.white }}>
                Next
              </Text>
            )}
          </TouchableOpacity>
          {stage > 0 && (
            <TouchableOpacity
              style={{ marginTop: 5 }}
              onPress={() => {
                setStage(stage - 1);
              }}
            >
              <Text style={{ textDecorationLine: "underline" }}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const TitleFont = styled(Text)`
  font-size: 24px;
  font-weight: 800;
`;

const SubTitleFont = styled(Text)`
  font-size: 16px;
  font-weight: 300;
`;

export default Welcome;
