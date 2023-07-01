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
  devMode: boolean,
  setCurrentFocusedFolder: Dispatch<React.SetStateAction<Folder>>,
  currentFocusedFolder: Folder
}

type RootStackParamList = {
  Unknown: "Unknown";
  Home: "Home";
  Login: "Login";
  Test: "Test";
  Home_Main: "Home_Main";
};

type Folder = {
  id: string;
  name: string;
  // add other properties as needed
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
  setUser: () => {}, 
  screenHeight: 0, 
  screenWidth:0,
  devMode: false,
  currentFocusedFolder: { // Initialize your new state here
    id: '',
    name: '',
    // initialize other properties as needed
  },
  setCurrentFocusedFolder: () => {}
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const navigator =
    useNavigation<NavigationProp<RootStackParamList, "Unknown">>();
  const devMode = true
  const screenHeight = Dimensions.get("window").height; // Get screen height
  const screenWidth = Dimensions.get("window").width; // Get screen width

  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
    const [user, setUser]:[User, Dispatch<SetStateAction<User>>] = useState({
      username: "",
      email: '',
      dob: "",
    })

    const [currentFocusedFolder, setCurrentFocusedFolder]: [Folder, Dispatch<SetStateAction<Folder>>] = useState({
      id: '',
      name: '',
      // initialize other properties as needed
    });
  return (
    <GlobalContext.Provider value={{ devMode, navigator, user, setUser, screenHeight, screenWidth, currentFocusedFolder, setCurrentFocusedFolder }}>
      {children}
    </GlobalContext.Provider>
  );
};
