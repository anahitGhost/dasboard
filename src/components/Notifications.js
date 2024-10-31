import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getNotificationsRequest, markNotificationsAsReadRequest } from '../store/actions/notifications';
import Loader from './Loader';
import { ReactComponent as DeleteSvg } from '../assets/icons/remove.svg';
import SeeMore from './SeeMore';

function Notifications(props) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const notifications = useSelector((state) => state.notifications.notifications);
  const notificationsStatus = useSelector((state) => state.notifications.notificationsStatus);
  const notificationsTotalPages = useSelector((state) => state.notifications.notificationsTotalPages);

  useEffect(() => {
    dispatch(getNotificationsRequest({ page, order: 'desc', orderBy: 'createdAt' }, page > 1));

    return () => {
      dispatch(markNotificationsAsReadRequest());
    };
  }, [page]);

  return (
    <>
      <div className="notificationsContainer" onClick={() => props.onClose()} onWheel={() => props.onClose()} />
      <div className="notifications">
        <div className="top">
          <p>Notifications</p>
          <DeleteSvg onClick={() => props.onClose()} />
        </div>
        <div className="notificationsItemContainer">
          {[{
            fName: 'Jack', lName: 'Jonson', orderItemsCount: 6, id: 1,
          }].map((data) => (
            <div className="notificationItem" key={data.id}>
              <span className="dot" />
              <div className="info">
                <p className="content">
                  <b>
                    {`${data.fName} ${data.lName} `}
                  </b>
                  <span>{`ordered ${data.orderItemsCount || 1} product${data.orderItemsCount > 1 ? 's' : ''}.`}</span>
                </p>
                <p className="date">
                  {moment().format('YYYY-MM-DD') !== moment(data.createdAt).format('YYYY-MM-DD')
                    ? moment(data.createdAt).format('ll')
                    : moment(data.createdAt).fromNow(true)}
                  {' '}
                </p>
              </div>
            </div>
          ))}
          {+notificationsTotalPages > 1 && page !== +notificationsTotalPages
            ? <SeeMore onClick={() => setPage(page + 1)} />
            : null}
          {notificationsStatus === 'ok' && _.isEmpty(notifications)
            ? <div className="noNotifications">No notifications</div>
            : null}
          {notificationsStatus === 'request' && _.isEmpty(notifications)
            ? <Loader />
            : null}
        </div>
      </div>
    </>
  );
}

Notifications.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default Notifications;
