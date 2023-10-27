import React, { useContext, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HeaderWithBackButton from "../../components/HeaderWithBackBtn";
import { COLORS, SPACE } from "../../theme/constants";
import { GlobalContext } from "../../context/GlobalProvider";
import { Center, HStack, Box, VStack } from "native-base";

const PlanCard = ({ isSelected, onSelect, title, price }) => (
  <TouchableOpacity style={styles.card} onPress={onSelect}>
    <View
      style={[
        styles.cardInner,
        { backgroundColor: isSelected ? COLORS.themeYellow : COLORS.lightGrey },
      ]}
    >
      <Text
        style={[
          styles.bigText,
          { color: isSelected ? COLORS.white : COLORS.standardBlack },
        ]}
      >
        {title}
      </Text>
    </View>
    <View style={styles.priceRow}>
      <Text style={styles.priceText}>{price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: SPACE.nativeRoundMd,
    backgroundColor: COLORS.white,
    flex: 1,
    margin: "2%",
    padding: "2%", // Changed margin to padding
    justifyContent: "space-between", // Added to distribute space between inner elements
    height: 200,
  },
  cardInner: {
    borderRadius: SPACE.nativeRoundMd,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontWeight: "800",
    fontSize: 30,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  priceText: {
    fontWeight: "700",
    fontSize: 25,
    marginTop: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerInner: {
    width: "80%",
  },
  titleRow: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "500",
    fontSize: 25,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const PlansDetail = () => {
  const { screenHeight } = useContext(GlobalContext);
  const [selected, setSelected] = useState(0);

  return (
    <SafeAreaView>
      <View style={styles.headerRow}>
        <View style={styles.headerInner}>
          <HeaderWithBackButton title="" navigateToScreen="Profile" />
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>Premium</Text>
          </View>
        </View>
      </View>
      <HStack space={3} justifyContent="center" marginBottom={10} marginTop={10}>
        <Box h="40" w="40%" rounded="md" shadow={1}>
          <VStack space={5} justifyContent="center">
            <Text style={{fontWeight: 'bold'}}>Features Offered</Text>
            <Text>Folders</Text>
            <Text>Links Per Folders</Text>
            <Text>Folders Collaborators</Text>
            <Text>Cloud Storage</Text>
            <Text>App Themes</Text>
          </VStack>
        </Box>
        <Box h="40" w="20%" rounded="md" shadow={1}>
          
          <VStack space={5} justifyContent="center">
          <Text style={{fontWeight: 'bold'}}>Free</Text>
            <Text>20</Text>
            <Text>50</Text>
            <Text>2</Text>
            <Text>𐄂</Text>
            <Text>𐄂</Text>
          </VStack>
        </Box>
        <Box h="40" w="20%" rounded="md" shadow={3}>
        <VStack space={5} justifyContent="center">
          <Text style={{fontWeight: 'bold'}}>Premium</Text>
            <Text>Unlimited</Text>
            <Text>Unlimited</Text>
            <Text>Unlimited</Text>
            <Text>✓</Text>
            <Text>✓</Text>
          </VStack>
        </Box>
      </HStack>
      <View style={styles.cardRow}>
        <PlanCard
          isSelected={selected === 0}
          onSelect={() => setSelected(0)}
          title="1 Month"
          price="$0.99"
        />
        <PlanCard
          isSelected={selected === 1}
          onSelect={() => setSelected(1)}
          title="12 Months"
          price="$9.99"
        />
      </View>
    </SafeAreaView>
  );
};

export default PlansDetail;
