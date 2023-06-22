import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Text,
  View,
  Modal,
  Button,
  StyleSheet,
  PanResponder,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
type BottomModalProps = {
  ref: any;
  onClose?: () => void;
  onOpen?: () => void;
  height?: number;
};

export type BottomModalRefProps = {
  openMenu: () => void;
};

// * React.forwardRef is a method in React that allows a component to forward a ref that it receives to a child component.
// * This can be useful when you want a parent component to be able to call methods on a child component directly.
const BottomModal = React.forwardRef((props: BottomModalProps, ref) => {
  const [trigger, setTrigger] = useState(false);
  const hideMenu = () => {
    Animated.timing(menuAnimation, {
      duration: 500,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setTrigger(false);
      props.onClose?.();
    });
  };

  const showMenu = () => {
    setTrigger(true); // ! let the modal be able to render first and then do animation
    Animated.spring(menuAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      props.onOpen?.();
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Check if vertical swipe is upwards
      if (gestureState.dy > 5) {
        hideMenu();
        
      }
      //   if (gestureState.dy < 0) {
      //     hideMenu();
      //   }
    },
  });

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
      height: props.height || "auto", // props.height used here, defaults to 'auto' if not provided
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
    handleContainer: {
      alignItems: "center",
      padding: 10,
      height: 20,
      marginBottom: 10,
    },
    handle: {
      width: 50,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: "grey",
    },
  });

  // * To expose methods of the child component to the parent, you can use React.useImperativeHandle
  React.useImperativeHandle(ref, () => ({
    openMenu: () => showMenu(),
  }));

  const menuAnimation = useRef(new Animated.Value(0)).current;

  const menuStyle = {
    transform: [
      {
        translateY: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [props.height ? props.height : 300, 0],
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
            <ScrollView>
              <View
                style={styles.handleContainer}
                {...panResponder.panHandlers}
              >
                <View style={styles.handle} />
              </View>
              <Text>Menu Item 1</Text>
              <Text>Menu Item 2</Text>
              <Text>Menu Item 3</Text>
              <Button title="Close Menu" onPress={hideMenu} />
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
});

export default BottomModal;
