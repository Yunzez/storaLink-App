import React, { memo } from "react";
import { useModalContext } from "../context/ModalContext";
import { TouchableOpacity, Image } from "react-native";

type ToggleButtonProps = {
    activeSource: any;
    inactiveSource: any;
};

function ToggleModalButton({ activeSource, inactiveSource }: ToggleButtonProps) {
    const { isOpen, openModal } = useModalContext();
    return (
        <TouchableOpacity onPress={openModal}> 
            <Image source={isOpen ? activeSource : inactiveSource} />
        </TouchableOpacity>
    );
}

export default memo(ToggleModalButton);
