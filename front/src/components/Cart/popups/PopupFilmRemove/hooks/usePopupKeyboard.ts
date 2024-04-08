import { useEffect } from "react";

interface PopupKeyboardProps {
  opened: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const usePopupKeyboard = ({
  opened,
  onCancel,
  onConfirm,
}: PopupKeyboardProps) => {
  useEffect(() => {
    if (!opened) {
      return;
    }

    const handleKeyboard = (e) => {
      switch (e.key) {
        case "Escape": {
          onCancel?.();
          break;
        }
        case "Enter": {
          onConfirm?.();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [opened]);
};
