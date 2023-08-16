import React, { memo, useEffect, useState } from "react";
import { useModalContext } from "../context/ModalContext";
import { TouchableOpacity, Image } from "react-native";

type ToggleButtonProps = {
    activeSource: any;
    inactiveSource: any;
    indicator: any
    onClick: any
};

function ToggleModalButton({ activeSource, inactiveSource, indicator, onClick }: ToggleButtonProps) {
    console.log('current indicator', indicator)
    return (
        <TouchableOpacity onPress={() => {onClick()}}> 
            <Image source={indicator ? activeSource : inactiveSource} />
        </TouchableOpacity>
    );
}

export default ToggleModalButton;
