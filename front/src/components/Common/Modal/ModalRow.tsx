import React from "react";

import styles from "./Modal.module.css";

type ModalRowPropsType = {
  children: React.ReactNode;
};

const ModalRow: React.FC<ModalRowPropsType> = ({ children }) => {
  return <div className={styles.modalContentRow}>{children}</div>;
};

export default ModalRow;
