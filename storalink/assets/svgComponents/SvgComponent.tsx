import React, { ReactNode } from "react";
import { Svg } from "react-native-svg";

interface SvgComponentProps {
  children: ReactNode;
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
  [x: string]: any; // for extra properties
}

export interface SvgBasicProps {
    height?: string,
     width?: string,
     fill?:string
}

export interface SvgPropsWithAdvanced extends SvgBasicProps{
    color?:string
}

export interface SvgPropsAdvancedWithTrigger extends SvgPropsWithAdvanced {
  active: boolean
}
const SvgComponent: React.FC<SvgComponentProps> = (props) => {
  const {
    children,
    width = "24",
    height = "24",
    viewBox = "0 0 24 24",
    fill = "none",
    ...restProps
  } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      {...restProps}
    >
      {children}
    </Svg>
  );
};

export default SvgComponent;
