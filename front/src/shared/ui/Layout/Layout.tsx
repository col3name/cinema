import React from "react";

import {Providers} from "@/shared/redux/provider";

import styles from "@/app/page.module.css";

export type LayoutPropsType = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutPropsType> = ({children}) => {
    return (
        <Providers>
            <main className={styles.main}>{children && children}</main>
        </Providers>
    );
};

export default Layout;
