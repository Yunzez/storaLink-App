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
import { checkEmail, checkPassword } from "../utils";

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
  const { navigator, user, setUser, devMode } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remeber, setRemenber] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);

    // Handle login action here
    // Use a regular expression to validate the email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (checkEmail(username, emailRegex).length > 0) {
      setError("Invalid email address");
      alert("Please enter a valid email address");
      setLoading(false);
      return 
    }

    if (checkPassword(password).length > 0) {
      setError("Invalid password");
      setLoading(false);
      return
    }
    // * logging in
    const url =
      "https://vast-garden-82865-6f202a95ef85.herokuapp.com/api/v1/auth/authenticate";
    const requestBody = {
      username: username,
      password: password,
      email: username,
      dob: "2000-01-01",
    };

    if(devMode) {
      console.log('test mode: login without correct credentials')
      navigator.navigate("Home");
        console.log("Username: ", username);
        console.log("Password: ", password);
        setLoading(false);
        setUser({ username: username, email: username, dob: "" });
        return 
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          return response.json();
        } else {
          setError('Some Error Occured')
          setLoading(false);
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        console.log("Response data:", data);
        navigator.navigate("Home");
        console.log("Username: ", username);
        console.log("Password: ", password);
        setLoading(false);
        setUser({ username: username, email: username, dob: "" });
        // Handle the response data here
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error.json());
        // Handle any errors here
      });

    // ! checking login goes here

    // * assume failure test goes here:
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading ? (
        <LoadingScreen loadingText={"We are logging you in"} />
      ) : (
        <Container>
          <View style={{ width: "75%", justifyContent: "center" }}>
            <View style={{ marginBottom: 10, alignItems: "center" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/img/YellowIcon.png")}
              />
               <Text style={{marginTop: 10, fontSize: 18, fontWeight: '500'}}>Sign in </Text>
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
