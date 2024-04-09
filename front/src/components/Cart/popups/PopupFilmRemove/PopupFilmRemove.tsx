import React from "react";

import Modal from "@/components/Common/Modal";
import Button from "@/components/Common/Button";
import { ModalRow } from "@/components/Common/Modal";

import { useConfirmPopup } from "@/redux/features/cart/hooks";

import { usePopupKeyboard } from "./hooks/usePopupKeyboard";

const PopupFilmRemove = () => {
  const { opened, close, remove } = useConfirmPopup();

  usePopupKeyboard({ opened, onConfirm: remove, onCancel: close });

  return (
    <Modal active={opened} close={close} title={"Удаление билета"}>
      <p>Вы уверены, что хотите удалить билет?</p>
      <ModalRow>
        <Button onClick={remove}>Да</Button>
        <Button done onClick={close}>
          Нет
        </Button>
      </ModalRow>
    </Modal>
  );
};

export default PopupFilmRemove;
