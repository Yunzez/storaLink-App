import { useCallback, useEffect } from "react";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";


const useShare = (navigate) => {

    const handleShare = useCallback(async (item) => {
        if (!item || !item.data) {
            return;
        }

        const { data } = item;
        console.log(data, 'in use share')
        // navigate('SomeOtherComponent', {
        //     var1,
        //     data,
        //     anotherParam
        // });

    }, []);

    useEffect(() => {
        console.log('initial share')
        ShareMenu.getInitialShare(handleShare);
    }, []);

    useEffect(() => {
       
        const listener = ShareMenu.addNewShareListener(handleShare);
       
        return () => {
            listener.remove();
        };
    }, []);

}

export {
    useShare,
};