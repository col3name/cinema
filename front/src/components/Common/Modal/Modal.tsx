import React, { useCallback, useEffect } from "react";
import cn from "classnames";

import Portal from "@/components/Common/Portal";
import CloseIcon from "@/components/Common/icons/close";

import styles from "./Modal.module.css";

interface ModalProps {
  title?: string;
  active: boolean;
  close: () => void;
  children: React.ReactNode;
  clearState?(): void;
}

export const Modal: React.FC<ModalProps> = ({
  clearState,
  title = "",
  active,
  close,
  children,
}) => {
  const onClose = useCallback(() => {
    clearState && clearState();
    close();
  }, [clearState, close]);
  return (
    <Portal>
      <div
        onKeyDown={(e) => {
          const { key } = e;
          console.log(key);
        }}
        className={cn(styles.modal, {
          [styles.active]: active,
        })}
        onClick={onClose}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalContentHeader}>
            <h2 className={styles.modalContentHeaderTitle}>{title}</h2>
            <CloseIcon
              className={styles.modalContentHeaderButton}
              onClick={close}
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
