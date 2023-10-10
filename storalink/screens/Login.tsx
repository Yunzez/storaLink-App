import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextInput,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import Checkbox from "expo-checkbox";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { GlobalContext } from "../context/GlobalProvider";
import { SPACE, COLORS } from "../theme/constants";
import {
  AGeneralErrorBlock,
  AGeneralTextInput,
} from "../theme/genericComponents";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import LoadingScreen from "../components/LoadingScreen";
import { SocialMediaSrc, checkEmail, checkPassword } from "../utils";
import { useShare } from "../hooks/useShare";
import { ShareMenuReactView } from "react-native-share-menu";
import { FolderProps } from "../context/GlobalProvider";
import ProgressBar from "../components/ProgressBar";
import { LinkViewProps } from "../Test/MockData";
import useNativeStorage from "../hooks/useNativeStorage";
import useKeyChain from "../hooks/useKeyChain";

const Container = styled(SafeAreaView)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  padding: ${SPACE.lg};
  border: 1px solid #ddd;
  margin-bottom: 12px;
  border-radius: ${SPACE.roundMd};
`;

const SignInBtnContainer = styled(TouchableOpacity)`
  background-color: ${COLORS.themeYellow};
  border-radius: ${SPACE.roundMd};
  padding: ${SPACE.lg};
  margin-top: ${SPACE.lg};
  margin-bottom: ${SPACE.lg};
`;

export const StyledCheckbox = styled(Checkbox)`
  border-radius: ${SPACE.roundSm};
  padding: ${SPACE.sm};
  margin-right: ${SPACE.sm};
`;

const SignInText = styled(Text)`
  color: blue;
  margin-left: 8px;
`;

const cleanLinkData = (linkData: any[]): LinkViewProps[] => {
  return linkData.map((link: any) => ({
    id: link.id,
    title: link.linkName,
    socialMediaType: link.sourceType as SocialMediaSrc, // Assuming SocialMediaSrc is an enum or type that matches the sourceType strings
    imgUrl: link.imageUrl,
    linkUrl: link.linkUrl,
    description: link.description,
    onClick: () => {
      // Define your onClick function here
    },
  }));
};

const cleanFolderData = (folderData: any[]): FolderProps[] => {
  console.log("cleaning folder: ", folderData);
  return folderData.map((folder: any) => ({
    id: folder.id,
    name: folder.folderName || null,
    description: folder.folderDescription || null,
    thumbNailUrl: folder.imageUrl || null,
    desc: "", // You can set this to a default value or derive it from the original data
    pinned: false, // You can set this to a default value or derive it from the original data
    links: folder.linkIds.length > 0 ? folder.linkIds : null, // Assuming linkIds can be used to derive LinkViewProps
  }));
};

const mergeFolderLink = (
  folderData: FolderProps[],
  linkData: LinkViewProps[]
): FolderProps[] => {
  for (const folder of folderData) {
    const foundLinks = [];
    if (folder.links != null) {
      for (const linkId of folder.links) {
        linkData.find((link) => {
          link.id === (linkId as unknown) && foundLinks.push(link);
        });
      }
    }
    folder.links = foundLinks;
  }

  return folderData;
};

export const Login = () => {
  const {
    navigator,
    user,
    setUser,
    devMode,
    backendLink,
    dispatchFolderCache,
  } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remeber, setRemenber] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProgess, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const { saveNativeData, getNativeData } = useNativeStorage();
  const { storeGenericCredentials, loadGenericCredentials, resetCredentials } =
    useKeyChain();
  let userData: FolderProps[];
  useEffect(() => {
    console.log("dev mode is: ", devMode);
  }, [devMode]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleLogin = async () => {
    setLoading(true);

    let userId = "";
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (checkEmail(username, emailRegex).length > 0) {
      setError("Invalid email address");
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (checkPassword(password).length > 0) {
      setError("Invalid password");
      setLoading(false);
      return;
    }
    const requestBody = {
      username: username,
      password: password,
      email: username,
    };
    console.log(requestBody, devMode);

    // if (devMode) {
    //   console.log("test mode: login without correct credentials");
    //   navigator.navigate("BottomNavigater");
    //   console.log("Username: ", username);
    //   console.log("Password: ", password);
    //   setLoading(false);
    //   setUser({ username: username, email: username, dob: "" });
    //   return;
    // }

    const url = backendLink + "/api/v1/auth/login";
    console.log("login url", url);
    setLoadingText("Logging you in");
    setLoadingProgress(30);
    await delay(2000);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data", data);
        setUser({ id: data.id, username: username, email: username, dob: "" });

        if (data.jwtToken) {
          console.log("jwt token", data.jwtToken);
          // Store JWT token
          await Keychain.setGenericPassword("jwt", data.jwtToken, {
            service: "jwtService",
            accessGroup: 'group.com.storalink.app'
          });

          await Keychain.setGenericPassword(username, data.id, {
            service: 'idService',
            accessGroup: 'group.com.storalink.app'
          });

          await fetchUserFolderInfo(data.id); // Make sure this function is also async

          await fetchUserLinkInfo(data.id);

          if (remeber) {
            await Keychain.resetGenericPassword();
            await AsyncStorage.setItem(
              "userCredentials",
              JSON.stringify({ username })
            );
            saveNativeData("username", username);
            await Keychain.setGenericPassword(username, password, {
              service: 'loginService',
            });
            
            console.log(
              "save user name in userDefaults:",
              username,
              " save password in keychain"
            );
          }
        }
      } else {
        const errorData = await response.json();
        const error = new Error();
        error.message = errorData.error;
        throw error;
      }
    } catch (error) {
      // setLoading(false);
      console.log("Error:", error.message);
    }
    setLoadingText("Getting your folder");
    setLoadingProgress(60);
    await delay(1000);

    setLoadingText("Getting your link");
    setLoadingProgress(90);
    await delay(1000);

    setLoadingText("Welcome to Storalink");
    setLoadingProgress(100);
    await delay(1000);
    setLoading(false);
    navigator.navigate("BottomNavigater");
  };

  const fetchUserLinkInfo = async (userId: string | number) => {
    const userFolderUrl = `${backendLink}/api/v1/link/user/${userId}`;
    const token = await Keychain.getGenericPassword({service: 'jwtService'});
    console.log("current userId", userId);
    try {
      const rep = await fetch(userFolderUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.password}`,
        },
        credentials: "include",
      });

      if (rep.ok) {
        const linkData = await rep.json(); // Wait for the data to be parsed
        console.log("linkData data: ", linkData); // Now log the data
        const cleanedLinkData = cleanLinkData(linkData);
        userData = mergeFolderLink(userData, cleanedLinkData);
        console.log("merged userData", userData);
        dispatchFolderCache({
          type: "DUMP",
          folders: userData as FolderProps[],
        });
      }
    } catch (error) {
      console.log("Error in fetching link", error);
    }
  };

  const fetchUserFolderInfo = async (userId: string | number) => {
    const userFolderUrl = `${backendLink}/api/v1/folder/user/${userId}`;
    const token = await Keychain.getGenericPassword({service: 'jwtService'});
    console.log('token', token);
    console.log("current userId", userId);
    try {
      const rep = await fetch(userFolderUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.password}`,
        },
        credentials: "include",
      });

      if (rep.ok) {
        const folderData = await rep.json(); // Wait for the data to be parsed
        console.log("folder data: ", folderData); // Now log the data

        userData = cleanFolderData(folderData);
      } else {
        console.log("Error in fetching folder:", rep.status, rep.statusText);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  ShareMenuReactView.data().then((data) => {
    console.log("current data", data);
  });

  // * restore username in local storage
  useEffect(() => {
    AsyncStorage.getItem("username").then((res) => {
      if (res) {
        setUsername(res);
        setRemenber(true);
      }
    });
    Keychain.getGenericPassword({service: 'userCredentials'}).then((res) => {
      if (res) {
        setPassword(res.password);
      }
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <ProgressBar
              progress={loadingProgess}
              fillColor={COLORS.themeYellow}
              statusText={loadingText}
            />
            {/* <LoadingScreen loadingText={"We are logging you in"} /> */}
          </View>
        </View>
      ) : (
        <Container>
          <View style={{ width: "75%", justifyContent: "center" }}>
            <View style={{ marginBottom: 10, alignItems: "center" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/img/YellowIcon.png")}
              />
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>
                Sign in{" "}
              </Text>
            </View>
            <AGeneralErrorBlock errorText={error} />

            <Text style={{ margin: 2 }}>Email</Text>
            <AGeneralTextInput
              value={username}
              onChangeText={(text: string) => {
                setUsername(text);
                setError("");
              }}
              placeholder="Username"
              secureTextEntry={false}
            />
            <Text style={{ paddingTop: 15 }}>Password</Text>

            <AGeneralTextInput
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                setError("");
              }}
              placeholder="Password"
              secureTextEntry={true}
            />

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <StyledCheckbox
                disabled={false}
                value={remeber}
                onValueChange={(newValue) => {
                  setRemenber(newValue), console.log("new vakue", newValue);
                }}
                color={remeber ? COLORS.themeYellow : undefined}
              />
              <Text>Remember Me</Text>
            </View>

            <SignInBtnContainer>
              <Button
                title="Sign In"
                color={COLORS.white}
                onPress={handleLogin}
              />
            </SignInBtnContainer>
            <View style={{ flexDirection: "row" }}>
              <Text>Don't have an Account?</Text>
              <SignInText
                onPress={() => {
                  navigator.navigate("Signup");
                }}
              >
                Sign up
              </SignInText>
            </View>
          </View>
        </Container>
      )}
    </ScrollView>
  );
};

export default Login;
