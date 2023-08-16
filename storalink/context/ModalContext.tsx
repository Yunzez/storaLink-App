
/**
 * !
 * !
 * ! 
 * THIS IS DEPRECATED
 */


import { createContext, useContext, useState } from 'react';
import BottomModal, { ModalDataProps, ModalBasicProps } from '../components/BottomModal';

const ModalContext = createContext({
  isOpen: false,
  header: { name: '', icon: undefined } as ModalBasicProps,
  data: [] as ModalDataProps[] | undefined,
  openModal: (headerContent: ModalBasicProps, dataContent: ModalDataProps[]) => {},
  closeModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);



export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState<ModalBasicProps>({name: '', icon: ''});
  const [data, setData] = useState<ModalDataProps[]| undefined>();

  const openModal = (headerContent: ModalBasicProps, dataContent: ModalDataProps[]) => {
    if (headerContent) setHeader(headerContent);
    if (dataContent) setData(dataContent);
    setIsOpen(true);
  };
  

  const closeModal = () => {
    setIsOpen(false);
    // Optionally reset header and data if needed
    setHeader({name: '', icon: ''});
    setData([]);
  };

  return (
    <ModalContext.Provider value={{ isOpen, header, data, openModal, closeModal }}>
      {children}
      {isOpen && <BottomModal header={header} data={data} onClose={closeModal} />}
    </ModalContext.Provider>
  );
};
