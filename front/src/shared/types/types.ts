import {MouseEventHandler} from "react";

export type IconPropsType = {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};

export type Review = {
  rating: number;
  text: string;
  name: string;
  authorImage?: string;
};

