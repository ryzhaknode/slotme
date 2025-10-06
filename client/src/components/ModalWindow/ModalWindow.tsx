import Modal from 'react-modal';

Modal.setAppElement('#root');

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export default function ModalWindow({ isOpen, onClose, imageUrl }: IProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={{
        base: 'fixed inset-0 flex items-center justify-center bg-black/75 z-[99999] overflow-hidden opacity-0 transition-opacity duration-500 ease-in-out',
        afterOpen: 'opacity-100',
        beforeClose: 'opacity-0',
      }}
      className={{
        base: 'relative max-w-[1080px] outline-none',
        afterOpen: '',
        beforeClose: '',
      }}
    >
      <img className="max-h-[100%]" src={imageUrl} alt="image" />
    </Modal>
  );
}
