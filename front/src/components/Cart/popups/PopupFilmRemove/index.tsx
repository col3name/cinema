import React from 'react';
import {useConfirmPopupOpened} from '@/redux/features/cart/hooks';
import Modal from '@/components/Common/Modal/Modal';
import Button from '@/components/Common/Button';
import ModalRow from '@/components/Common/Modal/ModalRow';

const PopupFilmRemove = () => {
  const {opened, close, remove} = useConfirmPopupOpened();

  return <Modal active={ opened } close={ close } title={'Удаление билета'}>
    <p>Вы уверены, что хотите удалить билет?</p>
    <ModalRow>
      <Button onClick={ remove }>Да</Button>
      <Button done onClick={ close }>Нет</Button>
    </ModalRow>
  </Modal>
};

export default PopupFilmRemove;