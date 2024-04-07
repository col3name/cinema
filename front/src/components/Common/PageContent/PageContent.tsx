import React from "react";
import cn from "classnames";

import Header from "@/components/Header";

import styles from "./stylesPageContent.module.css";

export type PageContentPropsType = {
  className?: string;
  children: React.ReactNode;
  isFlex?: boolean;
  disableCounter?: boolean;
};

const PageContent: React.FC<PageContentPropsType> = ({
  className,
  children,
  isFlex = false,
  disableCounter = false,
}) => {
  return (
    <>
      <Header disableCounter={disableCounter} />
      <main
        className={cn(
          styles.content,
          {
            [styles.contentFlex]: isFlex,
          },
          className,
        )}
      >
        {children && children}
      </main>
      <div id="root-modal" />
    </>
  );
};

export default PageContent;
