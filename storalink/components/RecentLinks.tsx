import React, { useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SmallLinkView, { SmallLinkViewProps } from "./SmallLinkView";
import { SocialMediaSrc } from "../utils";
import styled from "styled-components";
import { COLORS } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
type RecentLinksProps = {
  linkList: SmallLinkViewProps[];
};

const ComponentTitle = styled(Text)`
  text-align: start;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: ${COLORS.themeYellow};
`;

const RecentLinks = ({ linkList }: RecentLinksProps) => {
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
  const RecentLinksWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    flex: 1;
  `;

  return (
    <View>
      <ComponentTitle>Recent Links</ComponentTitle>
      <RecentLinksWrapper>
        <ScrollView showsVerticalScrollIndicator={true}>
          {linkList.map((card, index) => (
            <SmallLinkView
              key={index}
              title={card.title}
              socialMediaType={SocialMediaSrc.INS}
            />
          ))}
        </ScrollView>
      </RecentLinksWrapper>
    </View>
  );
};

export default RecentLinks;
