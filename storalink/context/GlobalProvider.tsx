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
  setUser: Dispatch<SetStateAction<User>>
}

type RootStackParamList = {
  Unknown: "Unknown";
  Home: "Home";
  Login: "Login";
  Test: "Test";
  Home_Main: "Home_Main";
};

type User = {
  username: string;
  email: string;
  dob: string;
};

export const GlobalContext = createContext<GlobalContextProps>({
  navigator: undefined,
  user: {
    username: "",
    email: "",
    dob: "",
  },
  setUser: null, 
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

  const screenHeight = Dimensions.get("window").height; // Get screen height
  const screenWidth = Dimensions.get("window").width; // Get screen width

  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  
    const [user, setUser]:[User, Dispatch<SetStateAction<User>>] = useState({
      username: "",
      email: '',
      dob: "",
    })
  return (
    <GlobalContext.Provider value={{ navigator, user, setUser, screenHeight, screenWidth }}>
      {children}
    </GlobalContext.Provider>
  );
};
