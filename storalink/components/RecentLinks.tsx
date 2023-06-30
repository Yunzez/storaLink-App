import React, { useContext, useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SmallLinkView, { SmallLinkViewProps } from "./SmallLinkView";
import { SocialMediaSrc } from "../utils";
import styled from "styled-components";
import { COLORS } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import BlockLinkView from "./BlockLinkView";
import { LinkViewProps } from "../Test/MockData";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import { Svg, Path } from "react-native-svg";
type RecentLinksProps = {
  linkList: LinkViewProps[];
};

const ComponentTitle = styled(Text)`
  text-align: left;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: ${COLORS.themeYellow};
`;

const RecentLinks = ({ linkList }: RecentLinksProps) => {
  const [blockView, setBlockView] = useState(false);
  const { navigator, screenHeight, screenWidth } = useContext(GlobalContext);
  const RecentLinksWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    flex: 1;
  `;
  console.log("blockviewicon:", BlockViewIcon);
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <ComponentTitle>Recent Links</ComponentTitle>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: 53,
            height: 24,
            borderRadius: 4,
            backgroundColor: COLORS.lightGrey,
            justifyContent:"space-around"
          }}
        >
          <TouchableOpacity
            style={{ width: 20, height: 20, alignItems:"center", justifyContent:'center' }}
            onPress={() => {
              setBlockView(false);
            }}
          >
            <RowViewIcon width="12" height="12"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 20, height: 20, alignItems:"center", justifyContent:'center' }}
            onPress={() => {
              setBlockView(true);
            }}
          >
            <BlockViewIcon width="12" height="12"/>
          </TouchableOpacity>
        </View>
      </View>

      <RecentLinksWrapper>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {blockView
              ? linkList.map((card, index) => (
                  <View style={{ width: (screenWidth * 0.9) / 2 }}>
                    <BlockLinkView
                      key={index}
                      title={card.title}
                      imgUrl={card.imgUrl ?? ""}
                      onClick={card.onClick ?? (() => console.log("hi"))}
                      socialMediaType={SocialMediaSrc.INS}
                    />
                  </View>
                ))
              : linkList.map((card, index) => (
                  <SmallLinkView
                    key={index}
                    title={card.title}
                    socialMediaType={SocialMediaSrc.INS}
                  />
                ))}
          </View>
        </ScrollView>
      </RecentLinksWrapper>
    </View>
  );
};

export default RecentLinks;
