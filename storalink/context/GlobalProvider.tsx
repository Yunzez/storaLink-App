"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { Dimensions } from "react-native";

interface GlobalContextProps {
  navigator: any;
  user: User;
  screenHeight: number, 
  screenWidth:number
}

type RootStackParamList = {
  Unknown: "Unknown";
  Home: "Home";
  Login: "Login";
  Test: "Test";
  Home_Main: "Home_Main";
};

type User = {
  name: string;
  age: number;
  boa: string;
};

export const GlobalContext = createContext<GlobalContextProps>({
  navigator: undefined,
  user: {
    name: "",
    age: 0,
    boa: "",
  },
  screenHeight: 0, 
  screenWidth:0
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const navigator =
    useNavigation<NavigationProp<RootStackParamList, "Unknown">>();
  const user = {
    name: "",
    age: 0,
    boa: "",
  };

  const screenHeight = Dimensions.get("window").height; // Get screen height
  const screenWidth = Dimensions.get("window").width; // Get screen width

  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  return (
    <GlobalContext.Provider value={{ navigator, user, screenHeight, screenWidth }}>
      {children}
    </GlobalContext.Provider>
  );
};
