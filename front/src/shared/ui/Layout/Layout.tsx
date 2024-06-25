import React from "react";

import { Providers } from "@/redux/provider";
import Footer from "@/components/Footer";

import styles from "@/app/page.module.css";

export type LayoutPropsType = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <div>
      <Providers>
        <main className={styles.main}>{children && children}</main>
        <Footer />
      </Providers>
    </div>
  );
};

export default Layout;
