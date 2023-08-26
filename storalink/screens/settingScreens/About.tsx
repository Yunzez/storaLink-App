import React, { useContext, useState } from "react";
import { View, Text, Linking, Button, TouchableOpacity} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import * as WebBrowser from 'expo-web-browser';

const About = () => {
    const [result, setResult] = useState<WebBrowser.WebBrowserResult>()
    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.storalink.com/');
        setResult(result);
      };
  return (
    <View
      style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}
    >
      <View
        style={{ flexDirection: "column", width: "80%", alignItems: "center" }}
      >
        <Text>This is about our app </Text>

        <Button title="Check out our website" onPress={_handlePressButtonAsync} />
      </View>
    </View>
  );
};

export default About;
