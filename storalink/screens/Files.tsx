import React, { useContext } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { SearchBar } from "../theme/genericComponents";
import styled from "styled-components";
import { MockCardList } from "../Test/MockData";
import FolderCard from "../components/FolderCard";
import { GlobalContext } from "../context/GlobalProvider";
import SearchComponent from "../components/SearchbarComponent";


export const Files = () => {
  const { screenHeight } = useContext(GlobalContext);
  const FolderListWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    height: ${screenHeight * 0.8}px;
  `;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
      }}
    >
 <SearchComponent placeHolder="Search files, saved items, etc..."/>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FolderListWrapper>
            {MockCardList.map((card, index) => (
              <FolderCard
                key={index}
                title={card.title}
                imgUrl={card.imgUrl}
                onClick={card.onClick}
              />
            ))}
          </FolderListWrapper>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default Files;
