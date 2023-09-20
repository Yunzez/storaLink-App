import React from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";
import { SocialMediaSrc } from "../utils";
import styled from "styled-components";
import insIcon from "../assets/icon/instagramIcon.png";
import placeHolder from "../assets/mockImg/placeholder.png";
import { COLORS, SPACE } from "../theme/constants";
import MoreOptionsButtonDropDown from "./MoreOptionsButtonDropDown";
const CardImage = styled(Image)`
  width: 16px;
  padding: 3px;
  margin-right: 5px;
  height: 16px;
`;

const ImagePreview = styled(Image)`
  width: 50px;
  height: 40px;
  border-radius: ${SPACE.roundSm};
`;

export type SmallLinkViewProps = {
  title: string;
  socialMediaType: SocialMediaSrc;
  description?: string;
};

const LinkWrapper = styled(View)`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-item: center;
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
      break;
  }
  return (
    <LinkWrapper>
      <ImagePreview source={placeHolder as ImageSourcePropType} />
      <View style={{ marginLeft: 5 }}>
        <View style={{ flexDirection: "row" }}>
          <CardImage source={SocialIconUrl as ImageSourcePropType} />
          <Text>{props.title}</Text>
        </View>

        <Text style={{color: COLORS.darkGrey}}>{props.description ?? " "}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <MoreOptionsButtonDropDown
          option={[
            {
              name: "test",
              onClick: () => {
                console.log("hi this is a test");
              },
            },
          ]}
        />
      </View>
    </LinkWrapper>
  );
};

export default SmallLinkView;
