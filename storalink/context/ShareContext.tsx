import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
type shareContextProps = {
  shareUrl: string;
};

const ShareContext = createContext<shareContextProps>({
  shareUrl: "",
});

export const useShareContext = () => useContext(ShareContext);

type SharedItem = {
  mimeType: string;
  data: string;
  extraData: any;
};

export const ShareContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shareUrl, setShareUrl] = useState("");
  const [sharedMimeType, setSharedMimeType] = useState('');
  const handleShare = useCallback((item: SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data, extraData } = item;

    setShareUrl(data);
    setSharedMimeType(mimeType);
    console.log(ShareMenuReactView.data())
    // You can receive extra data from your custom Share View
    console.log(extraData);
    console.log(data, 'here is the share data')
  }, []);

  useEffect(() => {
    if(handleShare ) {
        ShareMenu.getInitialShare(handleShare);
    }
   
  }, []);

  // initalize listner
  const listener = ShareMenu.addNewShareListener(handleShare);
  useEffect(() => {
    // remove listener on unMount
    return () => {
      listener.remove();
    };
  }, []);

//   if (!sharedMimeType && !shareUrl) {
//     // The user hasn't shared anything yet
//     return null;
//   }

  return (
    <ShareContext.Provider value={{ shareUrl }}>
      {children}
    </ShareContext.Provider>
  );
};
