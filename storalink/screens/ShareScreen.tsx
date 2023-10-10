import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { COLORS, SPACE } from "../theme/constants";
import { FolderProps, GlobalContext } from "../context/GlobalProvider";
import { AGeneralTextInput, ReturnButton } from "../theme/genericComponents";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import LoadingScreen from "../components/LoadingScreen";
import { getLinkPreview } from "link-preview-js";
import { useNavigation } from "@react-navigation/native";
import SearchComponent, {
  searchResultType,
  searchValueType,
} from "../components/SearchbarComponent";
import useNativeStorage from "../hooks/useNativeStorage";
import * as Keychain from "react-native-keychain";
import { postCreateLink } from "../hooks/usePostFiles";
import { LinkViewProps, SocialMediaSrc } from "../Test/MockData";
const ShareScreen = () => {
  const defaultImage = require("../assets/img/YellowIcon.png");
  const { setShareUrl, user, devMode } = useContext(GlobalContext);
  const backendLink = devMode
    ? "http://localhost:8080"
    : "https://vast-garden-82865-6f202a95ef85.herokuapp.com/api/v1/auth/authenticate";
  const [sharedData, setSharedData] = useState("");
  const [shareScreenFolders, setShareScreenFolders] = useState([]);
  const [linkMetadata, setLinkMetadata] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(0);
  const [folderID, setFolderID] = useState(0);
  const { getNativeData } = useNativeStorage();
  const [jwtToken, setJwtToken] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("initial");

  useEffect(() => {
    console.log("user: ", user);

    fetchData();
    try {
      ShareMenuReactView.data().then((data) => {
        const link = data.data[0].data;
        setShareUrl(link);
        setSharedData(link);
        if (data) {
          getLinkPreview(link)
            .then((metadata) => {
              console.log(metadata);
              setLinkMetadata(metadata);
              setTitle(metadata.title);
              setDescription(metadata.description);
              setImage(metadata.images[0]);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching link metadata:", error);
              setLoading(false);
            });
        }
      });
    } catch (error) {
      console.error("Error getting shared data:", error);
    }
  }, []);

  const fetchData = async () => {
    const userName = await getNativeData("username");
    setUsername(userName);
    console.log("got username:", userName);
    // Retrieving
    try {
      const credentials = await Keychain.getGenericPassword({
        service: "jwtService",
        accessGroup: "group.com.storalink.app",
      });

      const userIdKey = await Keychain.getGenericPassword({
        service: "idService",
        accessGroup: "group.com.storalink.app",
      });
      const userId = userIdKey.password;
      if (credentials && userId) {
        setJwtToken(credentials.password);
        setUserId(userId);
        console.log(
          "Credentials successfully loaded",
          credentials.password,
          "  id:",
          userId
        );
        // * get folder info
        console.log("backend link: ", backendLink);
        const userFolderUrl = `${backendLink}/api/v1/folder/user/${userId}`;
        console.log("current userId", userId);
        try {
          const rep = await fetch(userFolderUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${credentials.password}`,
            },
            credentials: "include",
          });

          if (rep.ok) {
            const folderData = await rep.json(); // Wait for the data to be parsed
            console.log("folder data: ", folderData); // Now log the data

            const userData = cleanFolderData(folderData);
            setShareScreenFolders(userData);
            console.log(userData);
          } else {
            console.log(
              "Error in fetching folder:",
              rep.status,
              rep.statusText
            );
          }
        } catch (error) {
          console.log("Fetch error:", error);
        }
      } else {
        console.log("No credentials stored for this service.");
      }
    } catch (error) {
      console.log("Error retrieving the jwt token: ", error);
    }
  };

  const cleanFolderData = (folderData: any[]): FolderProps[] => {
    console.log("cleaning folder: ", folderData);
    return folderData.map((folder: any) => ({
      id: folder.id,
      name: folder.folderName || null,
      description: folder.folderDescription || null,
      thumbNailUrl: folder.imageUrl || null,
      desc: '', // You can set this to a default value or derive it from the original data
      pinned: false, // You can set this to a default value or derive it from the original data
      links: folder.linkIds.length > 0 ? folder.linkIds : null, // Assuming linkIds can be used to derive LinkViewProps
    }));
  };

  const searchAlgorithm = (value: string): Map<string, searchResultType> => {
    const retMap = new Map();
    if (!shareScreenFolders) {
      retMap.set("You have no folder yet, go create your first folder", {
        value: "no val",
        onClick: () => {},
        valueType: searchValueType.noValue,
      });
      return retMap;
    }
    for (const cover of shareScreenFolders) {
      console.log(cover);
      if (cover.name?.includes(value)) {
        retMap.set(cover.name, {
          onClick: () => {
            console.log(cover.id);
            setFolderID(cover.id);
          },
        });
      }
    }
    if (retMap.size === 0) {
      retMap.set("There is no result", { onClick: () => {} });
    }
    return retMap;
  };

  const handleAddPress = async () => {
    setStatus("loading");
    console.log("save", shareScreenFolders, sharedData);
    if (jwtToken.length != 0 && username) {
      console.log("add link for", username, "with token", jwtToken);
      const newLink: LinkViewProps = {
        title: title,
        linkUrl: sharedData,
        socialMediaType: SocialMediaSrc.INS,
        imgUrl: image,
        description: description,
      };

      // TODO add folder id
      console.log(userId, folderID);
      await postCreateLinkShareScreen(
        newLink,
        userId,
        folderID,
        jwtToken,
        description
      ).then((link) => {
        console.log("link: ", link);
        setStatus("success");
      });

      // ! no more to do, since share screen does not trigger local update
    }

    // ShareMenuReactView.dismissExtension();
  };

  // ! this is used for share screen only
  async function postCreateLinkShareScreen(
    link: LinkViewProps,
    userId: any,
    folderId: any,
    jwt: string,
    description?: string
  ): Promise<LinkViewProps> {
    const finalDes =
      description.length > 0 ? description : "This link has no description";
    link = {
      ...link,
      description: finalDes,
      linkUrl: link.linkUrl ?? link.title,
    };
    console.log("add a link : ", link);
    const createLinkRequest = {
      folderId: folderId,
      creatorId: userId,
      modifierId: userId,
      linkName: link.title,
      description: finalDes,
      note: "", // Add your note here
      linkUrl: link.linkUrl || "",
      imageUrl: link.imgUrl || "",
      sourceType: link.socialMediaType,
    };
    console.log("add a link request: ", createLinkRequest);
    console.log("logging backendlink", backendLink + "/api/v1/link");
    fetch(backendLink + "/api/v1/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
      body: JSON.stringify(createLinkRequest),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("add link status not ok");
          console.log(response);
          setStatus("error");
        }
      })
      .then((data) => {
        link = { ...link, id: data.id };
        console.log("data: ", data); // Log the JSON data
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    return link;
  }

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        ShareMenuReactView.dismissExtension();
      }, 2000);
    }
  }, [status]);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 5,
        marginTop: 25,
        marginHorizontal: 18,
      }}
    >
      {loading ? (
        <View style={{ justifyContent: "center", height: "100%" }}>
          <LoadingScreen />
        </View>
      ) : (
        (status == "initial" && (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  ShareMenuReactView.dismissExtension();
                }}
              >
                <Text style={{ fontSize: 18, color: COLORS.themeYellow }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <View style={{ width: 30, height: 30 }}>
                <TouchableOpacity onPress={handleAddPress}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={defaultImage}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  handleAddPress();
                }}
              >
                <Text style={{ fontSize: 18, color: COLORS.themeYellow }}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", height: 100, marginTop: 40 }}>
              <View style={{ width: "60%" }}>
                <Text>Link: {sharedData}</Text>
              </View>

              <View
                style={{ width: "40%", height: 100, paddingHorizontal: 15 }}
              >
                {image && (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: SPACE.nativeRoundMd,
                    }}
                    source={image.length == 0 ? defaultImage : { uri: image }}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text>Link Title:</Text>
              <AGeneralTextInput
                style={{
                  marginTop: 5,
                  borderColor: COLORS.themeYellow,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={{ marginTop: 20, minHeight: 10 }}>
              <Text>Description:</Text>
              <AGeneralTextInput
                multiline={true}
                numberOfLines={3}
                style={{
                  marginTop: 5,
                  borderColor: COLORS.themeYellow,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}
                value={description}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>Save in:</Text>
              <SearchComponent
                placeHolder="Search files, saved items, etc..."
                algorithm={searchAlgorithm}
              />
            </View>
          </View>
        )) ||
        (status == "success" && (
          <View style={{ justifyContent: "center", height: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text>Successfully added link to your folder</Text>
              <Text>This window will be closed in 2 seconds </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.themeYellow,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={() => {
                  ShareMenuReactView.dismissExtension();
                }}
              >
                <Text>Close now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )) ||
        (status == "error" && (
          <View style={{ justifyContent: "center", height: "100%" }}>
            <Text>There was an error adding your link</Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: COLORS.themeYellow,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setStatus("initial");
              }}
            >
              <Text>Try again</Text>
            </TouchableOpacity>
          </View>
        )) ||
        (status == "loading" && (
          <View style={{ justifyContent: "center", height: "100%" }}>
            <LoadingScreen />
            <Text>Adding your link...</Text>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

export default ShareScreen;
