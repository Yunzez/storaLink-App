import React, {
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

interface ModalBasicProps {
  name: string;
  icon?: string | React.FC | JSX.Element;
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

const BottomModal = (props: BottomModalProps) => {
  // hooks
  const { isOpen, openModal, closeModal } = useModalContext();
  const sheetRef = useRef<BottomSheet>(null);
  const [isClosing, setIsClosing] = useState(false);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  useEffect(() => {
    console.log("modal status change", isOpen);
    if (isOpen) {
      console.log("open modal");
      handleSnapPress(2); // Open to 90% by default
      // handleClosePress();
    } else {
      handleSnapPress(2);
      // handleClosePress(); // Close the modal
    }
  }, [isOpen]);
  // callbacks

  const handleClosePress = useCallback(() => {
    setIsClosing(true);
    sheetRef.current?.close();
  }, []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <Modal
      visible={isOpen}
      style={{ height: "100%" }}
      transparent
      animationType="none"
    >
      <View style={styles.container}>
        <View>
          <Text> occupy space</Text>
        </View>
        {/* <Button title="Close" onPress={() => {handleClosePress(); closeModal()}} />
       <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onClose={() => {
            if (isClosing) {
              closeModal();
              setIsClosing(false);
            }
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
                return <ModalOption key={key} data={item} />;
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

const ModalOption = (props: { data: ModalDataProps }) => {
  return (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => {
        props.data.onClick();
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
