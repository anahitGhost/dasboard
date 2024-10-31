import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Button from './form/Button';
import { ReactComponent as RemoveSvg } from '../assets/icons/remove.svg';

function ConfirmationModal(props) {
  const {
    open, onClose, children, onConfirm, loading,
  } = props;

  return (
    <Modal
      isOpen={!!open}
      overlayClassName="otcModalOverlay"
      className="otcModalContent otcConfirmationModal"
      onRequestClose={onClose}
    >
      <div className="confirmationModal">
        <div className="top">
          <RemoveSvg onClick={onClose} />
        </div>
        {children}
        <div className="actions">
          <Button title="Submit" onClick={onConfirm} loading={loading} />
          <Button title="Cancel" onClick={onClose} className="white" />
        </div>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

ConfirmationModal.defaultProps = {
  open: false,
};
export default ConfirmationModal;
