import React from "react";

import Modal, {ModalRow} from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";

import {useConfirmPopup} from "@/entities/cart";
import {usePopupKeyboard} from "@/shared/hooks/usePopupKeyboard";

const PopupFilmRemoveConfirm = () => {
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

export default PopupFilmRemoveConfirm;