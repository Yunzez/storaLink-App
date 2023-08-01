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
import { LinkViewProps } from "../Test/MockData";
import { FolderCardProps } from "../components/FolderCard";
interface GlobalContextProps {
  navigator: any;
  user: User;
  screenHeight: number, 
  screenWidth:number
  setUser: Dispatch<SetStateAction<User>>
  devMode: boolean,
  setCurrentFocusedFolder: Dispatch<React.SetStateAction<FolderProps>>,
  currentFocusedFolder: FolderProps,
  folderCovers: FolderCardProps[]| null,
  setFolderCovers: Dispatch<SetStateAction<FolderCardProps[] | null>>;
}

type RootStackParamList = {
  Unknown: "Unknown";
  Home: "Home";
  Login: "Login";
  Test: "Test";
  Home_Main: "Home_Main";
};


export type FolderProps = {
  id: number ;
  name: string | null;
  description: string| null
  thumbNailUrl: string | null;
  links: LinkViewProps[];
  // add other properties as needed
};

type User = {
  username: string;
  email: string;
  dob: string;
};

// Define the context interface for folder covers
interface FolderCoversContextProps {
  folderCovers: FolderCardProps[] | null;
  setFolderCovers: Dispatch<SetStateAction<FolderCardProps[] | null>>;
}

// Create the context for folder covers
const FolderCoversContext = createContext<FolderCoversContextProps>({
  folderCovers: null,
  setFolderCovers: () => {},
});

// Custom hook to use the folder covers context
export const useFolderCoversContext = () => {
  return useContext(FolderCoversContext);
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
    id: null,
    name: null,
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

  const folderPreviewDataDefault = createContext<FolderCardProps[] | null>(null)
  const folderPreviewData = useContext(folderPreviewDataDefault)
// Get folderCovers and setFolderCovers from the FolderCoversContext
const { folderCovers, setFolderCovers } = useFolderCoversContext();
  
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
    const [user, setUser]:[User, Dispatch<SetStateAction<User>>] = useState({
      username: "",
      email: '',
      dob: "",
    })

    const [currentFocusedFolder, setCurrentFocusedFolder]: [FolderProps, Dispatch<SetStateAction<FolderProps>>] = useState({
      id: 1,
      name: 'Null',
      // initialize other properties as needed
    });
  return (
    <GlobalContext.Provider value={{ devMode, navigator, user, setUser, screenHeight, screenWidth, currentFocusedFolder, setCurrentFocusedFolder, folderCovers, setFolderCovers }}>
      {children}
    </GlobalContext.Provider>
  );
};
