import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { getOrdersRequest } from '../store/actions/orders';
import Loader from './Loader';

const getColor = (status) => ({
  delivered: '#0B8B00',
  pending: '#FF5F00',
  canceled: '#EB001B',
})[status];

const orders = [
  {
    id: 1,
    items: [{
      itemNumber: '123', productName: 'iPhone', qty: 2, price: 1400,
    }],
    customerName: 'Jack Jonseon',
    status: 'canceled',

  },
  {
    id: 2,
    items: [{
      itemNumber: '123', productName: 'iPhone', qty: 2, price: 1200,
    }],
    customerName: 'Jack Jonseon',
    status: 'delivered',
  },
  {
    id: 3,
    items: [{
      itemNumber: '123', productName: 'iPhone', qty: 2, price: 1000,
    }],
    customerName: 'Jack Jonseon',
    status: 'pending',
  },
  {
    id: 4,
    items: [{
      itemNumber: '123', productName: 'iPhone 15', qty: 4, price: 1000,
    }],
    customerName: 'Jack Jonseon',
    status: 'delivered',
  },
  {
    id: 5,
    items: [{
      itemNumber: '123', productName: 'iPhone 16', qty: 2, price: 1000,
    }],
    customerName: 'Jack Jonseon',
    status: 'delivered',
  },
];

function OrdersTable() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.account.profile);
  const company = profile.userType;

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getOrdersRequest({ page: 1 }));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="table ordersTable">
      {loading ? <Loader /> : null}
      {!loading && _.isEmpty(orders) ? <div className="noData">No data</div> : null}
      {!loading && !_.isEmpty(orders) ? (
        <div className="table">
          <div className="head">
            <div className="number">Number</div>

            {+company !== 2 ? (
              <div className="patient">Member</div>
            ) : null}

            <div className="date">Date</div>
            <div className="productName">Product Name</div>
            <div className="qty">Quantity</div>
            <div className="price">Price</div>
            <div className="status">Status</div>
          </div>
          <div className="body">
            {orders.map((order) => (
              <div className="row" key={order.id}>
                <div className="number">
                  {_.get(order, 'items[0].itemNumber', '-')}
                </div>
                {+company !== 2 ? (
                  <div className="patient">
                    {order.customerName}
                  </div>
                ) : null}
                <div className="date">
                  {moment(order.createdAt).format('MM-DD-YYYY')}
                </div>
                <div className="productName">
                  {order.items.map((o) => o.productName).join(', ')}
                </div>
                <div className="qty">
                  {_.sumBy(order.items, (o) => +o.qty)}
                </div>
                <div className="price">
                  {`$${(_.sumBy(order.items, (o) => +o.price) || 0).toFixed()}`}
                </div>
                <div className="status" style={{ color: getColor(order.status) }}>
                  {_.upperFirst(order.status) || '-'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default OrdersTable;
