import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextInput,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { GlobalContext } from "../context/GlobalProvider";
import { SPACE, COLORS } from "../theme/constants";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  AGeneralErrorBlock,
  AGeneralTextInput,
} from "../theme/genericComponents";
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
  text-decorationline: underline;
  margin-left: 8px;
`;

export const Signup = () => {
  const { backendLink } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { navigator, user, setUser } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remeber, setRemenber] = useState(false);
  const handleLogin = () => {
    // Handle login action here
    if (checkEmail(username).length > 0) {
      setError("Invalid email address");
      alert("Please enter a valid email address");
      return;
    }

    if (checkPassword(password).length > 0) {
      setError("Invalid password");
      return;
    }
    const url = backendLink + "/api/v1/auth/signup";
    const requestBody = {
      username: username,
      password: password,
      email: username,
      dob: "2000-01-01",
      authorities: ["USER"],
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          console.log("error:", response);
          return response.json().then((errorData) => {
            // Assuming the backend sends a JSON with an 'error' field

            const error = new Error();
            error.message = errorData.error; // Set the error message
            throw error;
          });
        }
      })
      .then((data) => {
        console.log("Response data:", data);
        navigator.navigate("BottomNavigater");
        console.log("Username: ", username);
        console.log("Password: ", password);
        setLoading(false);
        setUser({ username: username, email: username, dob: "", id: data.id});
        // Handle the response data here
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error.message); // Access the error message here
        // Handle any errors here
      });
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
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>
                Sign Up{" "}
              </Text>
            </View>
            <AGeneralErrorBlock errorText={error} />
            <Text style={{ paddingTop: 15 }}>Email</Text>
            <AGeneralTextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
            />
            <Text style={{ paddingTop: 15 }}>Password</Text>
            <AGeneralTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
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
                title="Sign Up"
                color={COLORS.white}
                onPress={handleLogin}
              />
            </SignInBtnContainer>
            <View style={{ flexDirection: "row" }}>
              <Text>Have an Account?</Text>
              <SignInText
                onPress={() => {
                  navigator.navigate("Login");
                }}
              >
                Sign in
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

export default Signup;
