import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Modal,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { COLORS, SPACE } from "../theme/constants";
import { useModalContext } from "../context/ModalContext";

export interface ModalBasicProps {
  name: string;
  icon?: string | React.FC | JSX.Element;
}

export interface ModalDataProps extends ModalBasicProps {
  onClick: () => void;
}

export type BottomModalProps = {
  openIndicator: boolean;
  setOpenIndicator: Dispatch<SetStateAction<boolean>>
  onOpen?: () => void;
  height?: number;
  data: ModalDataProps[];
  header?: ModalBasicProps;
  onClose?: () => void;
};

const BottomModal = (props: BottomModalProps) => {
  // hooks
  console.log('bottom modal triggered', props.header.name)
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["45%", "75%", "90%"], []);

  useEffect(() => {
    console.log("modal status change", props.openIndicator);
    if (props.openIndicator) {
      console.log("open modal");
      handleSnapPress(2); // Open to 90% by default
    } 
  }, [props.openIndicator]);
  // callbacks

  const handleClosePress = () => {
    sheetRef.current?.close();
  };

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <Modal
      visible={props.openIndicator == true}
      style={{ height: "100%" }}
      transparent
      animationType="none"
    >
      <View style={styles.container}>
        
        {/* <Button title="Close" onPress={() => {handleClosePress(); closeModal()}} />
       <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onClose={() => {
            props.setOpenIndicator(false)
          }}
        >
          <View style={styles.contentContainer}>
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
                return <ModalOption key={key} data={item} closeModal={handleClosePress}/>;
              })}
            </View>

            <Button
              title="Close"
              onPress={() => {
                handleClosePress();
              }}
            />
          </View>
        </BottomSheet>
      </View>
    </Modal>
  );
};

const ModalOption = (props: { data: ModalDataProps, closeModal:()=>void}) => {
  return (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => {
        console.log('option onpressed')
        props.data.onClick();
        props.closeModal()
      }}
    >
      {typeof props.data.icon === "function" ? (
        <props.data.icon />
      ) : (
        props.data.icon || null
      )}
      <Text style={styles.optionText}>{props.data.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
    zIndex: 999,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  separator: {
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
  optionContainer: {
    padding: SPACE.nativeMd,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    marginBottom: 10,
    borderRadius: SPACE.nativeRoundMd,
  },
  optionText: {
    fontSize: 15,
    marginLeft: 10,
  },
});

export default BottomModal;
