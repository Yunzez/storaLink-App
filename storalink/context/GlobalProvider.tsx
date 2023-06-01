"use client"
import React, { createContext, useContext, useState, ReactNode, useRef, SetStateAction, Dispatch, useEffect } from "react";
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

interface GlobalContextProps {
    navigator: any;
}

type RootStackParamList = {
    Unknown : 'Unknown'
    Home: 'Home';
    Login: 'Login';
    Test: 'Test'
    Home_Main: 'Home_Main' 
  };
  
export const GlobalContext = createContext<GlobalContextProps>({
  navigator: undefined
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const navigator =
    useNavigation<NavigationProp<RootStackParamList, "Unknown">>();

  
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  return (
    <GlobalContext.Provider value={{navigator }}>
      {children}
    </GlobalContext.Provider>
  );
};
