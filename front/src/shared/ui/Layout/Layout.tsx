import React from "react";

import { Providers } from "@/shared/redux/provider";
import Footer from "@/widgets/Footer";

import styles from "@/app/page.module.css";

export type LayoutPropsType = {
  children: React.ReactNode;
    bgColor?: string;
};

const Layout: React.FC<LayoutPropsType> = ({ children, bgColor = undefined }) => {
  return (
    <div style={{background: bgColor}}>
      <Providers>
        <main className={styles.main} style={{background: bgColor}}>{children && children}</main>
        <Footer />
      </Providers>
    </div>
  );
};

export default Layout;
