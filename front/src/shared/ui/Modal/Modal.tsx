import React, { useCallback } from "react";
import cn from "classnames";

import Portal from "@/shared/ui/Portal";
import CloseIcon from "@/shared/ui/icons/close";

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
