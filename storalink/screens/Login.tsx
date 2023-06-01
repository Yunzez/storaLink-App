import React, { useContext, useState } from "react";
import { Button, TextInput, SafeAreaView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { GlobalContext } from "../context/GlobalProvider";

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 16px;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  border-radius: 4px;
`;


export const Login = () => {
    const { navigator } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login action here
    navigator.navigate("Home");
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <Container>
      <StyledInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />

      <StyledInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </Container>
  );
};

export default Login;
