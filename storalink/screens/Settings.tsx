import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../context/GlobalProvider";
import { COLORS, SPACE } from "../theme/constants";
import UserAvatorWidget from "../components/UserAvatorWidget";
import Profile from "../assets/svgComponents/Profile";
import Sun from "../assets/svgComponents/Sun";
import DoorBell from "../assets/svgComponents/DoorBell";
import ShoppingCart from "../assets/svgComponents/ShoppingCart";
import RightArrowIcon, {
  RightArrowOpenIcon,
} from "../assets/svgComponents/RightArrowIcon";
import Lock from "../assets/svgComponents/Lock";
import MessageQuestion from "../assets/svgComponents/MessageQuestion";
import LogoSVG from "../assets/svgComponents/LogoSVG";
import Star from "../assets/svgComponents/Star";
import StoraModal, { StoraModalProps } from "../components/StoraModal";
import Pencil from "../assets/svgComponents/Pencil";
import { Switch } from "native-base";
import { getEmptyUser } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Settings = () => {
  const {
    navigator,
    user,
    setUser,
    dispatchFolderCache,
    dispatchFolderCovers,
    dispatchRecentLinkCache,
  } = useContext(GlobalContext);

  const onLogOut = async () => {
    // * refresh user data
    if (user) {
      setUser(getEmptyUser());
      dispatchFolderCache({ type: "CLEAR" });
      dispatchFolderCovers({ type: "CLEAR" });
      dispatchRecentLinkCache({ type: "CLEAR" });
      await AsyncStorage.removeItem("userCredentials");
      navigator.navigate("Login");
    } else {
      throw Error("user is null");
    }
  };

  const mockOnPress = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <UserAvatorWidget />

      <Text style={styles.settingHeader}>Application</Text>

      <SettingButton
        title="Account"
        onPress={() => navigator.navigate("account")}
        Icon={<Profile width="24" height="24" />}
      />

      <SettingButton
        title="Appearance"
        onPress={() => navigator.navigate("appearance")}
        Icon={<Sun width="24" height="24" />}
      />

      <SettingButton
        title="Notification"
        onPress={() => navigator.navigate("notification")}
        Icon={<DoorBell width="24" height="24" />}
      />

      <SettingButton
        title="Upgrade Plan"
        onPress={() => navigator.navigate("plans")}
        Icon={<ShoppingCart width="24" height="24" />}
      />

      {/* <Text style={styles.settingHeader}>More Info</Text>

      <SettingButton
        title="Privacy & Security"
        onPress={mockOnPress}
        Icon={<Lock width="24" height="24" />}
      />

      <SettingButton
        title="Help & Support"
        onPress={mockOnPress}
        Icon={<MessageQuestion width="24" height="24" />}
      /> */}

      <Text style={styles.settingHeader}>Other</Text>

      <SettingButton
        title="About"
        onPress={() => navigator.navigate("about")}
        Icon={<LogoSVG width="24" height="24" />}
      />

      <SettingButton
        title="Rate Storalink"
        onPress={mockOnPress}
        Icon={<Star width="24" height="24" />}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={() => onLogOut()}>
        <Text style={{ color: COLORS.themeYellow }}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => {navigator.navigate('Welcome'), AsyncStorage.setItem('NeedWelcome' , "true")}}>
        <Text style={{ color: COLORS.themeYellow }}>test welcome</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

type SettingActionBtnProps = {
  title: string;
  onPress: () => void;
  Icon?: JSX.Element;
  actionBtnNode?: React.ReactNode;
};
export const SettingActionBtn = ({
  title,
  onPress,
  Icon,
  actionBtnNode,
}: SettingActionBtnProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Icon ? Icon : ""}
      <Text style={{ marginLeft: 10, fontSize: 16 }}>{title}</Text>
    </View>
    <View>
      {actionBtnNode ? (
        actionBtnNode
      ) : (
        <Pencil width="30" height="30" color={COLORS.themeYellow} />
      )}
    </View>
  </TouchableOpacity>
);

type ToggleActionBtnProps = {
  onToggle: (value: boolean) => void;
  title: string;
};

export const ToggleActionBtn = ({ title, onToggle }: ToggleActionBtnProps) => {
  return (
    <View style={styles.button}>
      <Text style={{ marginLeft: 10, fontSize: 16 }}>{title}</Text>
      <Switch
        size="md"
        offTrackColor={COLORS.lightGrey}
        onTrackColor={COLORS.lightOrange}
        onThumbColor={COLORS.themeYellow}
        offThumbColor={COLORS.darkGrey}
        onValueChange={(value: boolean) => {
          console.log("value change", value);
          onToggle(value);
        }}
      />
    </View>
  );
};

type SettingBtnProp = {
  title: string;
  onPress: () => void;
  Icon?: JSX.Element;
};
export const SettingButton = ({ title, onPress, Icon }: SettingBtnProp) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Icon ? Icon : ""}
      <Text style={{ marginLeft: 10, fontSize: 16 }}>{title}</Text>
    </View>
    <View>
      <RightArrowOpenIcon width="28" height="28" />
    </View>
  </TouchableOpacity>
);

export const SettingSaveBtn = (props: { onClick: () => void }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: COLORS.lightOrange,
        paddingVertical: 10,
        borderRadius: SPACE.nativeRoundSm,
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 5,
      }}
      onPress={() => props.onClick()}
    >
      <Text>Save</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 21,
    marginTop: 21,
  },
  avatarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "#FFF",
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 21,
    elevation: 5, // Required for Android
  },
  avatarText: {
    fontSize: 18,
  },
  button: {
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginVertical: 5,
    backgroundColor: COLORS.lightGrey,
    elevation: 5, // Required for Android
    width: "100%",
    flexDirection: "row",
  },
  settingHeader: {
    color: COLORS.themeYellow,
    width: "100%",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  logoutBtn: {
    paddingVertical: 10,
    paddingHorizontal: 21,
    width: "100%",
    borderRadius: SPACE.nativeRoundSm,
    borderWidth: 1,
    borderColor: COLORS.themeYellow,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Settings;
