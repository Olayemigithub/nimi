import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentConfirmationModal = ({ show, handleClose, handleConfirm, message }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Payment Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm Payment
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentConfirmationModal;

