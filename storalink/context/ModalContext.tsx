import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);


export const ModalProvider = ({ children }: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  
    return (
      <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    );
  };
  