import { FolderCardProps } from "../components/FolderCard";
import placeHolder from "../assets/mockImg/placeholder.png";
import { SmallLinkViewProps } from "../components/SmallLinkView";
// import { SocialMediaSrc } from "../utils";
import { FolderProps } from "../context/GlobalProvider";

export enum SocialMediaSrc {
  INS = "Instagram",
  FB = "Facebook",
  YT = "Youtube",
  TK = "TikTok",
}

export interface LinkViewProps extends SmallLinkViewProps {
  id?: number | string;
  title: string;
  socialMediaType: SocialMediaSrc;
  imgUrl?: string;
  linkUrl?: string;
  description?: string;
  onClick?: () => void;
}
export const MockCardList: FolderCardProps[] = [
  {
    title: "testing card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: "testing card 2",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: "fancy card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: " card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: "Lol card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: "hey card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: "yo card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
  {
    title: "dude card",
    imgUrl: placeHolder,
    onClick: () => {
      console.log("hello");
    },
    linksNumber: 0
  },
];

export const MockLinkList: LinkViewProps[] = [
  {
    title: "Welcome to Thailand",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Los Angelos",
    socialMediaType: SocialMediaSrc.INS?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Seattle",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to My Ass",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Thailand",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Los Angelos",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Seattle",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to My Ass", 
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Thailand",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Los Angelos",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Seattle",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to My Ass",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Thailand",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Los Angelos",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to Seattle",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
  {
    title: "Welcome to My Ass",
    socialMediaType: SocialMediaSrc.INS ?? ' ',
    imgUrl: placeHolder,
  },
];

export const MockSingleFolderData: FolderProps[] = [
  {
    id: 1,
    name: "Travel Tips",
    description: "New Folder for testing, yohoo",
    thumbNailUrl: placeHolder,
    links: MockLinkList,
    desc: ''
  },
];
