import { useState } from 'react';

type ModalType = 'image' | null;

export default function useModal() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: Exclude<ModalType, null>) => setModalType(type);
  const closeModal = () => setModalType(null);

  return {
    modalType,
    isOpen: modalType !== null,
    openModal,
    closeModal,
  };
}
