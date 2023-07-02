import React from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";
import { SocialMediaSrc } from "../utils";
import styled from "styled-components";
import insIcon from "../assets/icon/instagramIcon.png";
const CardImage = styled(Image)`
  width: 20px;
  padding: 3px;
  margin-right: 5px;
  height: 20px;
`;

export type SmallLinkViewProps = {
  title: string;
  socialMediaType: SocialMediaSrc;
};

const LinkWrapper = styled(View)`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;
const SmallLinkView = (props: SmallLinkViewProps) => {
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
      SocialIconUrl = "ins";
      break;
  }
  return (
    <LinkWrapper>
      <CardImage source={SocialIconUrl as ImageSourcePropType} />
      <Text>{props.title}</Text>
    </LinkWrapper>
  );
};

export default SmallLinkView;
