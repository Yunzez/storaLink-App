import { useState } from "react";
import { Modal, Center } from "native-base";
import { Text, TouchableOpacity } from "react-native";
import Pencil from "../assets/svgComponents/Pencil";
import { COLORS } from "../theme/constants";

export interface StoraModalProps {
  children: React.ReactNode;
  actionBtnNode?: React.ReactNode;
}

export const StoraModal = ({ children, actionBtnNode }: StoraModalProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Center>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        {actionBtnNode ? actionBtnNode :  <Pencil width="30" height="30" color={COLORS.themeYellow}/>}
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" >
          <Modal.Header style={{ borderBottomWidth: 0 }}>
            {" "}
            <Modal.CloseButton />
          </Modal.Header>
          {children}
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default StoraModal;
