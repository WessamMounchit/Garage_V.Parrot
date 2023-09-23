import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button className="custom__btn" onClick={onClose}>
          Fermer
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
