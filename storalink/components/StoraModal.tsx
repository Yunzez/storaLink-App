import { useContext, useState } from "react";
import { Modal, Center } from "native-base";
import { Text, TouchableOpacity } from "react-native";
import Pencil from "../assets/svgComponents/Pencil";
import { COLORS } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";

export interface StoraModalProps {
  children: React.ReactNode;
  actionBtnNode?: React.ReactNode;
  trigger: boolean
  setTrigger: React.Dispatch<boolean>
}

export const StoraModal = ({ children, actionBtnNode, trigger, setTrigger }: StoraModalProps) => {
  const {screenWidth} = useContext(GlobalContext)
  return (
    <Center >
     
      <Modal isOpen={trigger} onClose={() => setTrigger(false)} >
        <Modal.Content maxWidth={screenWidth} >
          <Modal.Header style={{ borderBottomWidth: 0 }}>
            <Modal.CloseButton />
          </Modal.Header>
          {children}
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default StoraModal;
