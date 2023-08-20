import React from "react";
import { Svg, Path } from "react-native-svg";
import SvgComponent from "./SvgComponent";
import { SvgBasicProps } from "./SvgComponent";
const PinnedFolderIcon = (props: SvgBasicProps) => {
  return (
    <SvgComponent height={props.height} width={props.width} viewBox="0 0 16 16">
      <Path
        d="M6.37843 9.94218L8.09843 11.4489C8.17843 11.5222 8.3051 11.5222 8.3851 11.4489L10.1051 9.94218C10.5518 9.54885 10.6118 8.88218 10.2384 8.41552C9.8651 7.94885 9.1851 7.86218 8.71176 8.22218L8.2451 8.58218L7.77176 8.22885C7.29176 7.86885 6.61843 7.95552 6.2451 8.42218C5.87176 8.88218 5.93176 9.55552 6.37843 9.94218Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.6667 7.33325V11.3333C14.6667 13.9999 14 14.6666 11.3333 14.6666H4.66666C1.99999 14.6666 1.33333 13.9999 1.33333 11.3333V4.66659C1.33333 1.99992 1.99999 1.33325 4.66666 1.33325H5.66666C6.66666 1.33325 6.88666 1.62659 7.26666 2.13325L8.26666 3.46659C8.51999 3.79992 8.66666 3.99992 9.33333 3.99992H11.3333C14 3.99992 14.6667 4.66659 14.6667 7.33325Z"
        stroke="white"
        stroke-miterlimit="10"
      />
      <Path
        d="M5.33333 1.33325H11.3333C12.6667 1.33325 13.3333 1.99992 13.3333 3.33325V4.25325"
        stroke="white"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgComponent>
  );
};

export default PinnedFolderIcon;
