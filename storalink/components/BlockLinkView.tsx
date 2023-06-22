import React, { useContext, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SocialMediaSrc } from "../utils";
import styled from "styled-components";
import insIcon from "../assets/icon/instagramIcon.png";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";

export type BlockLinkViewProps = {
  socialMediaType: SocialMediaSrc;
  title: string;
  imgUrl: string;
  onClick: () => void;
};

const BlockLinkView = (props: BlockLinkViewProps) => {
  const { screenWidth } = useContext(GlobalContext);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true, // Specify to use native driver for performance
    }).start();
  }, [fadeAnim]);
  
  let SocialIconUrl = insIcon;
  switch (props.socialMediaType) {
    case SocialMediaSrc.INS:
      SocialIconUrl = insIcon;
      break;
    case SocialMediaSrc.FB:
      SocialIconUrl = "ins";
      break;
    case SocialMediaSrc.YT:
      SocialIconUrl = "ins";
      break;
    case SocialMediaSrc.TK:
      SocialIconUrl = "ins";
      break;
    default:
      console.log("type does not match");
      break;
  }

  const Card = styled(TouchableOpacity)`
    margin: 5px;
    paddin: 5px;
    width: ${screenWidth * 0.4};
    height: 190px;
    margin-right: 10px;
    background-color: ${COLORS.lightGrey};
    border-radius: ${SPACE.md};
  `;

  const CardImage = styled(Image)`
    width: 100%;
    height: 70%;
    border-radius: ${SPACE.md};
    border-width: 1px;
    border-color: ${COLORS.themeYellow};
  `;

  const CardTitle = styled(Text)`
    margin: 5px;
    font-size: 15px;
    color: ${COLORS.darkGrey};
    font-weight: 500;
  `;
  return (
    <Card onPress={() => props.onClick}>
      <Image
        source={SocialIconUrl as ImageSourcePropType}
        style={{
          position: "absolute",
          width: 25,
          padding: 3,
          height: 25,
          zIndex: 99,
          right: 0,
          borderWidth: 1,
          borderColor: COLORS.themeYellow,
          borderRadius: SPACE.nativeRoundSm,
        }}
      />
      <CardImage source={props.imgUrl as ImageSourcePropType} />
      <CardTitle>{props.title}</CardTitle>
    </Card>
  );
};

export default BlockLinkView;
