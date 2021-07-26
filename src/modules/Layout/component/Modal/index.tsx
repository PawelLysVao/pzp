import React, { ReactNode } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export type Props = {
  isOpen: boolean;
  title: ReactNode;
  toggle: () => void;
  body?: ReactNode;
  footer?: ReactNode;
  onClosed?: () => void;
};

export const BaseModal = (props: Props): JSX.Element => {
  const { isOpen, toggle, title, body, footer, onClosed } = props;

  return (
    <Modal isOpen={isOpen} onClosed={onClosed}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export default BaseModal;
