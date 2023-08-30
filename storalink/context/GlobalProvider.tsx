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
import * as Notifications from "expo-notifications";
import { useNotification } from "../hooks/useNotification";
import placeHolder from "../assets/mockImg/placeholder.png";
import { ExpoPushToken } from "expo-notifications";
type RootStackParamList = {
  Unknown: "Unknown";
  Home: "Home";
  Login: "Login";
  Test: "Test";
  Home_Main: "Home_Main";
};

export type FolderProps = {
  id: number;
  name: string | null;
  description: string | null;
  thumbNailUrl: string | null;
  desc: string;
  pinned: boolean;
  links: LinkViewProps[] | null;
  // add other properties as needed
};

type User = {
  username: string;
  email: string;
  dob: string;
  profileImg?: string;
  userType?: "basic" | "advanced";
};

// Define the actions for folderCovers
type FolderCoversAction =
  | { type: "ADD"; folder: FolderCardProps }
  | { type: "REMOVE"; folderId: number };
// Create the reducer for folderCovers

/**
 *
 * @param state the FolderCardProps of the appliaction
 * @param action the action
 * @returns the new state
 *
 * this reducer keeps track of folders covers data globally
 */
const folderCoversReducer = (
  state: FolderCardProps[] | null,
  action: FolderCoversAction
): FolderCardProps[] | null => {
  switch (action.type) {
    case "ADD":
      return state !== null ? [...state, action.folder] : [action.folder];
    case "REMOVE":
      return state !== null
        ? state.filter((folder) => folder.id !== action.folderId)
        : null;
    default:
      return state;
  }
};

// Define the actions for folderCovers

type FolderCacheAction =
  | { type: "ADD_LINK"; link: LinkViewProps; folderId: number }
  | { type: "REMOVE_LINK"; linkId: number; folderId: number }
  | { type: "ADD_FOLDER"; folder: FolderProps }
  | { type: "REMOVE_FOLDER"; folderId: number }
  | { type: "PIN_FOLDER"; folderId: number }
  | { type: "UNPIN_FOLDER"; folderId: number };

/**
 *
 * @param state
 * @param action
 * @returns
 *
 * this keeps tack of the folder cache, the details of the folder info
 * including links, in the app
 */
const FolderCacheReducer = (
  state: FolderProps[] | null,
  action: FolderCacheAction
): FolderProps[] | null => {
  switch (action.type) {
    case "ADD_FOLDER":
      return state !== null ? [...state, action.folder] : [action.folder];
    case "ADD_LINK":
      return state !== null
        ? state.map((folder) => {
            return folder.id === action.folderId
              ? ({
                  ...folder,
                  links: folder.links
                    ? [...folder.links, action.link]
                    : [action.link],
                } as FolderProps)
              : folder;
          })
        : null;
    case "REMOVE_LINK":
      return state !== null
        ? state.map((folder) =>
            folder.id === action.folderId
              ? {
                  ...folder,
                  links: folder.links
                    ? folder.links.filter((link) => link.id !== action.linkId)
                    : null,
                }
              : folder
          )
        : null;
    case "PIN_FOLDER":
      return state !== null
        ? state.map((folder) => {
            if (folder.id === action.folderId) {
              console.log("update folder pin");
              return { ...folder, pinned: true };
            } else {
              return folder;
            }
          })
        : null;
    case "UNPIN_FOLDER":
      return state !== null
        ? state.map((folder) => {
            if (folder.id === action.folderId) {
              return { ...folder, pinned: false };
            } else {
              return folder;
            }
          })
        : null;
    case "REMOVE_FOLDER":
      console.log("Action received:", action);
      const newState =
        state !== null
          ? state.filter((folder) => folder.id !== action.folderId)
          : null;
      console.log("New state:", newState);
      return newState?.length == 0 ? null : newState;
    default:
      return state;
  }
};

type RecentLinkCacheAction =
  | { type: "ADD"; link: LinkViewProps; folderId: number }
  | { type: "DELETE"; folderId: number };

interface recentLinkType extends LinkViewProps {
  folderId: number;
}
/**
 *
 * @param state
 * @param action
 * @returns
 *
 * this keeps track of the recent 10 links for the app so we can display recent links
 */
const recentLinkCacheReducer = (
  state: recentLinkType[] | null,
  action: RecentLinkCacheAction
): recentLinkType[] | null => {
  switch (action.type) {
    case "ADD":
      // Create the new link with its associated folderId
      const newLink: recentLinkType = {
        ...action.link,
        folderId: action.folderId,
      };

      // Prepend the new link to the front of the array
      const newState = state !== null ? [newLink, ...state] : [newLink];

      // If the array's length exceeds 10, remove the last link
      if (newState.length > 10) {
        newState.pop();
      }

      return newState;

    case "DELETE":
      // Filter out all links associated with the provided folderId
      return state?.filter((link) => link.folderId !== action.folderId) || null;

    default:
      return state;
  }
};

interface GlobalContextProps {
  navigator: any;
  user: User;
  screenHeight: number;
  screenWidth: number;
  setUser: Dispatch<SetStateAction<User>>;
  devMode: boolean;
  setCurrentFocusedFolder: Dispatch<React.SetStateAction<FolderProps>>;
  currentFocusedFolder: FolderProps;
  folderCovers: FolderCardProps[] | null;
  dispatchFolderCovers: Dispatch<FolderCoversAction>;
  folderCache: FolderProps[] | null;
  dispatchFolderCache: Dispatch<FolderCacheAction>;
  recentLinkCache: LinkViewProps[] | null;
  dispatchRecentLinkCache: Dispatch<RecentLinkCacheAction>;
  expoPushToken: ExpoPushToken| string;
  setExpoPushToken: Dispatch<SetStateAction<ExpoPushToken| string>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  navigator: undefined,
  user: {
    username: "",
    email: "",
    dob: "",
    profileImg: "",
    userType: "basic",
  },
  setUser: () => {},
  screenHeight: 0,
  screenWidth: 0,
  devMode: false,
  setCurrentFocusedFolder: () => {},
  currentFocusedFolder: {
    id: 0,
    desc: "",
    name: null,
    description: "",
    thumbNailUrl: "",
    pinned: false,
    links: null,
  },
  folderCovers: null,
  dispatchFolderCovers: () => {},
  folderCache: null,
  dispatchFolderCache: () => {},
  recentLinkCache: null,
  dispatchRecentLinkCache: () => {},
  expoPushToken: '',
  setExpoPushToken: () => {},
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const navigator =
    useNavigation<NavigationProp<RootStackParamList, "Unknown">>();
  const devMode = true;
  const screenHeight = Dimensions.get("window").height; // Get screen height
  const screenWidth = Dimensions.get("window").width; // Get screen width

  const folderPreviewDataDefault = createContext<FolderCardProps[] | null>(
    null
  );
  const folderPreviewData = useContext(folderPreviewDataDefault);
  // Get folderCovers and setFolderCovers from the FolderCoversContext
  const [folderCovers, dispatchFolderCovers] = useReducer(
    folderCoversReducer,
    null
  );
  const [folderCache, dispatchFolderCache] = useReducer(
    FolderCacheReducer,
    null
  );
  const [recentLinkCache, dispatchRecentLinkCache] = useReducer(
    recentLinkCacheReducer,
    null
  );

  useEffect(() => {
    console.log("global provider see changes in folder cache", folderCache);
  }, [folderCache]);

  useEffect(() => {
    // Here, you can update the folderCache whenever folderCovers changes
    // This assumes that folderCovers and folderCache have a 1:1 mapping based on the folder ID
    if (folderCovers) {
      folderCovers.forEach((folderCover) => {
        // Assuming the folder ID is a unique identifier for folders
        const folderId = folderCover.id;

        // Check if the folder already exists in the folderCache
        const existingFolder = folderCache?.find(
          (folder) => folder.id === folderId
        );

        // If the folder does not exist in the folderCache, add it
        if (!existingFolder) {
          // Convert FolderCardProps to FolderProps
          const newFolder: FolderProps = {
            id: folderCover.id ?? 1,
            pinned: false,
            name: folderCover.title,
            description: folderCover.desc ?? " ",
            thumbNailUrl: folderCover.imgUrl, // Assuming imgUrl is the thumbnail URL
            links: null,
          };

          console.log("detech new folder added, catching up on folder cache");
          // Add the new folder to the folderCache
          dispatchFolderCache({ type: "ADD_FOLDER", folder: newFolder });
          console.log("folder cache new", folderCache);
        }
      });
    }
  }, [folderCovers, folderCache]);

  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const [user, setUser]: [User, Dispatch<SetStateAction<User>>] = useState({
    username: "",
    email: "",
    dob: "",
    profileImg: "",
    userType: "basic",
  } as User);

  const [currentFocusedFolder, setCurrentFocusedFolder]: [
    FolderProps,
    Dispatch<SetStateAction<FolderProps>>
  ] = useState({
    id: 1,
    name: "Null",
    // initialize other properties as needed
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  const { registerForPushNotificationsAsync, sendPushNotification } =
    useNotification();
  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken| string>("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    console.log(expoPushToken);
    if (notificationListener) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    }

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        devMode,
        navigator,
        user,
        setUser,
        screenHeight,
        screenWidth,
        currentFocusedFolder,
        setCurrentFocusedFolder,
        folderCovers,
        dispatchFolderCovers,
        folderCache,
        dispatchFolderCache,
        recentLinkCache,
        dispatchRecentLinkCache,
        expoPushToken,
        setExpoPushToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
