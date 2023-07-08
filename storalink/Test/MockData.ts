import { FolderCardProps } from "../components/FolderCard";
import placeHolder from "../assets/mockImg/placeholder.png";
import { SmallLinkViewProps } from "../components/SmallLinkView";
import { SocialMediaSrc } from "../utils";
import { FolderProps } from "../context/GlobalProvider";

export interface LinkViewProps extends SmallLinkViewProps {
    title: string;
    socialMediaType: SocialMediaSrc;
    imgUrl?: string;
    onClick?: () => void;
  };
export const MockCardList: FolderCardProps[] = [
  {
    title: "testing card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    }
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
  {
    title: " card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
  {
    title: "Lol card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
  {
    title: "hey card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
  {
    title: "yo card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
  {
    title: "dude card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
  },
];

export const MockLinkList: LinkViewProps[] = [
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS, imgUrl: placeHolder},
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS ,imgUrl: placeHolder},
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Thailand", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Los Angelos", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to Seattle", socialMediaType: SocialMediaSrc.INS,imgUrl: placeHolder },
  { title: "Welcome to My Ass", socialMediaType: SocialMediaSrc.INS ,imgUrl: placeHolder},
];


export const MockSingleFolderData: FolderProps = {
  id: 1,
  name: "Travel Tips",
  description: 'New Folder for testing, yohoo',
  thumbNailUrl: placeHolder, 
  links: MockLinkList
}
