import React, { useContext, useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SmallLinkView, { SmallLinkViewProps } from "./SmallLinkView";
import { SocialMediaSrc } from "../utils";
import styled from "styled-components";
import { COLORS, SPACE } from "../theme/constants";
import { GlobalContext } from "../context/GlobalProvider";
import BlockLinkView from "./BlockLinkView";
import { LinkViewProps } from "../Test/MockData";
import RowViewIcon from "../assets/svgComponents/RowViewIcon";
import BlockViewIcon from "../assets/svgComponents/BlockViewIcon";
import { Svg, Path } from "react-native-svg";


const ComponentTitle = styled(Text)`
  text-align: left;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: ${COLORS.themeYellow};
`;

const RecentLinks = () => {
  const [blockView, setBlockView] = useState(false);
  const { navigator, screenHeight, screenWidth, recentLinkCache } =
    useContext(GlobalContext);
  const [showRow, setShowRow] = useState(true);
  const RecentLinksWrapper = styled(View)`
    width: ${screenWidth * 0.9}px;
    flex: 1;
  `;
  const linkList: LinkViewProps[] = recentLinkCache as LinkViewProps[];
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
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
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: blockView ? COLORS.white : COLORS.themeYellow,
              borderRadius: SPACE.nativeRoundSm,
            }}
            onPress={() => {
              setBlockView(false);
            }}
          >
            <RowViewIcon
              width="15"
              height="15"
              color={blockView ? COLORS.themeYellow : COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: blockView ? COLORS.themeYellow : COLORS.white,
              borderRadius: SPACE.nativeRoundSm,
            }}
            onPress={() => {
              setBlockView(true);
            }}
          >
            <BlockViewIcon
              width="15"
              height="15"
              color={blockView ? COLORS.white : COLORS.themeYellow}
            />
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
            {linkList && linkList.length > 0 ? (
              blockView ? (
                linkList.map((card, index) => (
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
              ) : (
                linkList.map((card, index) => (
                  <SmallLinkView
                    key={index}
                    title={card.title}
                    socialMediaType={SocialMediaSrc.INS}
                  />
                ))
              )
            ) : (
              <View>
                 <Text>there is no link yet</Text>
              </View>
             
            )}
          </View>
        </ScrollView>
      </RecentLinksWrapper>
    </View>
  );
};

export default RecentLinks;
