import React, { useCallback, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import { ReactComponent as RemoveSvg } from '../assets/icons/remove.svg';
import Datepicker from './form/Datepicker';
import Button from './form/Button';
import Api from '../Api';

function SelectReportPeriodModal(props) {
  const {
    isOpen, onClose, patients, allOrders,
  } = props;

  const [from, setFrom] = useState(moment().subtract(1, 'month').toDate());
  const [to, setTo] = useState(moment().toDate());
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    const data = {
      startDate: moment(from).format('YYYY-MM-DD'),
      endDate: moment(to).format('YYYY-MM-DD'),
      customerIds: patients || undefined,
    };
    setLoading(true);
    if (allOrders) {
      const payload = await Api.downloadPatientsReportAll(data);
      if (payload.data.status === 'ok') {
        toast.success(payload.data.message);
      }
      setLoading(false);
      onClose();
    } else {
      await Api.downloadPatientsReport(data);
      setLoading(false);
      onClose();
    }
  }, [patients, from, to]);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="otcModalOverlay"
      className="otcModalContent selectReportPeriodModal"
      onRequestClose={onClose}
    >
      <div className="top">
        <RemoveSvg onClick={onClose} />
      </div>
      <p className="title">
        Please choose period for
        {' '}
        {allOrders ? 'export' : 'download'}
        {' '}
        report.
      </p>
      <div className="datePickers">
        <Datepicker
          showMonthDropdown
          showYearDropdown
          label="From"
          value={from}
          onChange={(date) => setFrom(date)}
        />
        <Datepicker
          showMonthDropdown
          showYearDropdown
          label="To"
          value={to}
          onChange={(date) => setTo(date)}
        />
      </div>
      <div className="actions">
        <Button title={allOrders ? 'Export' : 'Download'} onClick={handleDownload} loading={loading} />
        <Button title="Cancel" className="white" onClick={onClose} />
      </div>
    </Modal>
  );
}

SelectReportPeriodModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  allOrders: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  patients: PropTypes.array,
};

export default SelectReportPeriodModal;
