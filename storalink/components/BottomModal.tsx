import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Text,
  View,
  Modal,
  Button,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import { COLORS, SPACE } from "../theme/constants";
import { useModalContext } from "../context/ModalContext";
interface ModalBasicProps {
  name: string;
  icon?: string;
}

export interface ModalDataProps extends ModalBasicProps {
  onClick: () => void;
}

type BottomModalProps = {
  onOpen?: () => void;
  height?: number;
  data: ModalDataProps[];
  header?: ModalBasicProps;
  onClose?: () => void;
};

export type BottomModalRefProps = {
  openMenu: () => void;
};

// * React.forwardRef is a method in React that allows a component to forward a ref that it receives to a child component.
// * This can be useful when you want a parent component to be able to call methods on a child component directly.
const BottomModal = (props: BottomModalProps) => {
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
    headerContainer: {
      flexDirection: "row",
      marginBottom: 10, // Adjust as needed
      alignItems: "center",
    },
    separator: {
      borderBottomColor: COLORS.lightGrey,
      borderBottomWidth: 2,
      borderStyle: "solid",
    },
  });
  
  const { isOpen, closeModal } = useModalContext();
  const menuAnimation = useRef(
    new Animated.Value(props.height ? props.height : 300)
  ).current;

  const handleClose = () => {
    Animated.timing(menuAnimation, {
        toValue: 0 | (props.height ?? 300),
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
          props.onClose?.();
          closeModal()
      });
  }

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isOpen ? 0 : props.height || 300,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (isOpen) {
        props.onOpen?.();
      } else {
        props.onClose?.();
      }
    });
  }, [isOpen]);

  const menuStyle = {
    transform: [{ translateY: menuAnimation }],
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Check if vertical swipe is upwards
      if (gestureState.dy > 5) {
        closeModal();
      }
    },
  });
  return (
    <Modal visible={isOpen} transparent animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.menuContent, menuStyle]}>
          <ScrollView>
            <View style={styles.handleContainer} {...panResponder.panHandlers}>
              <View style={styles.handle} />
            </View>
            {props.header && (
              <View style={styles.headerContainer}>
                <Image
                  style={{ marginRight: 10 }}
                  source={props.header?.icon as ImageSourcePropType}
                />
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  {props.header?.name}
                </Text>
              </View>
            )}
            <View style={styles.separator} />
            <View style={{ paddingTop: 15, paddingBottom: 10 }}>
              {props.data.map((item, key) => {
                return <ModalOption key={key} data={item} />;
              })}
            </View>

            <Button title="Close" onPress={handleClose} />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const ModalOption = (props: { data: ModalDataProps }) => {
  return (
    <TouchableOpacity style={{ padding: SPACE.nativeMd }}>
      <Text style={{ fontSize: 15 }}>{props.data.name}</Text>
    </TouchableOpacity>
  );
};

export default BottomModal;
