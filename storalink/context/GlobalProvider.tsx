
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
  useReducer,
} from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { Dimensions } from "react-native";
import { LinkViewProps } from "../Test/MockData";
import { FolderCardProps } from "../components/FolderCard";

import placeHolder from "../assets/mockImg/placeholder.png";
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
  links: LinkViewProps[] | null;
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
  dispatchFolderCovers: Dispatch<FolderCoversAction>;
}

// Define the actions for folderCovers
type FolderCoversAction =
  | { type: 'ADD'; folder: FolderCardProps }
  | { type: 'REMOVE'; folderId: number };

// Create the reducer for folderCovers
const folderCoversReducer = (
  state: FolderCardProps[] | null,
  action: FolderCoversAction
): FolderCardProps[] | null => {
  switch (action.type) {
    case 'ADD':
      return state !== null ? [...state, action.folder] : [action.folder];
    case 'REMOVE':
      return state !== null
        ? state.filter((folder) => folder.id !== action.folderId)
        : null;
    default:
      return state;
  }
};


// Create the context for folder covers
const FolderCoversContext = createContext<FolderCoversContextProps>({
  folderCovers: null,
  dispatchFolderCovers: () => {},
});

// Custom hook to use the folder covers context
export const useFolderCoversContext = () => {
  return useContext(FolderCoversContext);
};
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
  dispatchFolderCovers: Dispatch<FolderCoversAction>;
}

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
  setCurrentFocusedFolder: () => {},
  currentFocusedFolder: {
    id: 0,
    name: null,
    description: '',
    thumbNailUrl: '',
    links: null
  },
  folderCovers: null,
  dispatchFolderCovers: () => {},
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
const [folderCovers, dispatchFolderCovers] = useReducer(folderCoversReducer, null);

  
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
    <GlobalContext.Provider value={{ devMode, navigator, user, setUser, screenHeight, screenWidth, currentFocusedFolder, setCurrentFocusedFolder, folderCovers, dispatchFolderCovers }}>
      {children}
    </GlobalContext.Provider>
  );
};
