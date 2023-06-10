import { FolderCardProps } from "../components/FolderCard";
import placeHolder from "../assets/mockImg/placeholder.png";
import { SmallLinkViewProps } from "../components/SmallLinkView";
import { SocialMediaSrc } from "../utils";
export const MockCardList: FolderCardProps[] = [
  {
    title: "testing card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
  {
    title: "testing card 2",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
  {
    title: "fancy card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
];

export const MockLinkList: SmallLinkViewProps[] = [
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS },
];
