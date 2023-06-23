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

const StyledCheckbox = styled(Checkbox)`
  border-radius: ${SPACE.roundSm};
  padding: ${SPACE.sm};
  margin-right: ${SPACE.sm};
`;

const SignInText = styled(Text)`
  color: blue;
  margin-left: 8px;
`;

export const Login = () => {
  const { navigator } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remeber, setRemenber] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    // Handle login action here
    // Use a regular expression to validate the email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(username)) {
      setError("test failed at email");
      alert("Please enter a valid email address");

      return;
    }

    if (password.length < 8) {
      setError("test failed at password");
      alert("Password must be at least 8 characters long");

      return;
    }

    // ! checking login goes here

    // * assume failure test goes here:

    navigator.navigate("Home");
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading ? (
        <LoadingScreen loadingText={'We are logging you in'}/>
      ) : (
        <Container>
          <View style={{ width: "75%", justifyContent: "center" }}>
            <View style={{ marginBottom: 10, alignItems: "center" }}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../assets/img/LoginIcon.png")}
              />
              <Text>Sign In </Text>
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
                onValueChange={(newValue) => setRemenber(newValue)}
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

            {/* <Button
          title="Go test"
          onPress={() => {
            navigator.navigate("Test");
          }}
          color={COLORS.standardBlack}
        /> */}
          </View>
        </Container>
      )}
    </ScrollView>
  );
};

export default Login;
