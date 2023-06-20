import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, View, Text, Animated, Modal, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Test from "./Test";
import SearchComponent from "../components/SearchbarComponent";
import { GlobalContext } from "../context/GlobalProvider";
import PinnedFolders from "../components/PinnedFolders";
import { MockCardList, MockLinkList } from "../Test/MockData";
import RecentLinks from "../components/RecentLinks";

import BottomSheet from "@gorhom/bottom-sheet";
export const Home = () => {

  type ModalRef = {
    openMenu: () => void;
  };
  
  const modalRef = useRef<ModalRef | null>(null);
  const { navigator, screenHeight } = useContext(GlobalContext);

  const showMenu = () => {
    if(modalRef.current) {
      modalRef.current.openMenu();
    }
  };
 
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <SearchComponent placeHolder="Search files, saved items, etc..." />
      <Button title="Open Menu" onPress={showMenu} />
      <PinnedFolders cardList={MockCardList} />
      <RecentLinks linkList={MockLinkList} />

      {/* <Button
      title="Go to Test"
      onPress={() => navigator.navigate('Test_home')}
    />
    <Button
      title="Back to Login"
      onPress={() => navigator.navigate('Login')}
    /> */}
      <BottomModal ref={modalRef}  />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  menuContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

type BottomModalProps = {
  ref: any
};

// * React.forwardRef is a method in React that allows a component to forward a ref that it receives to a child component. 
// * This can be useful when you want a parent component to be able to call methods on a child component directly.
// const BottomModal = React.forwardRef((props: BottomModalProps, ref) => {
  const BottomModal = React.forwardRef((props: BottomModalProps, ref) => {
  const [menuVisible, setMenuVisible] = useState(false);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [trigger, setTrigger] = useState(false);
  
  const hideMenu = () => {
    setTrigger(false);
  };
  
  const showMenu = () => {
    setTrigger(true);
  };

  // * To expose methods of the child component to the parent, you can use React.useImperativeHandle
  React.useImperativeHandle(ref, () => ({
    openMenu: () => showMenu()
  }));


  const menuAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    console.log('trigger')
  }, [trigger]);

  const menuStyle = {
    transform: [
      {
        translateY: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  return (
    <View>
      {/* Modal */}
      <Modal visible={trigger} transparent animationType="none">
        <View style={styles.modalContainer}>
          {/* Menu Content */}
          <Animated.View style={[styles.menuContent, menuStyle]}>
            <Text>Menu Item 1</Text>
            <Text>Menu Item 2</Text>
            <Text>Menu Item 3</Text>
            <Button title="Close Menu" onPress={hideMenu} />
          </Animated.View>
        </View>
      </Modal>
       
    </View>
  );
});

export default Home;
