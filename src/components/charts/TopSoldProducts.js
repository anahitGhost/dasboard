import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import ChartTableHeader from './ChartTableHeader';
import { getOrdersProductsHealthPlanRequest } from '../../store/actions/dashboard';
import Utils from '../../helpers/Utils';
import Loader from '../Loader';
import { getProductsRequest } from '../../store/actions/products';


const ordersHealthPlan = [
  { productName: 'iPhone', sales: '34', amount: '1000' },
  { productName: 'iPhone 13', sales: '44', amount: '1000' },
  { productName: 'iPhone 14', sales: '4444', amount: '1000' },
  { productName: 'iPhone 15', sales: '123', amount: '1000' },
]

function TopSoldProducts() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getOrdersProductsHealthPlanRequest({
      startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }));
  }, []);

  return (
    <div className="topSoldProducts chartTableContainer">
      <ChartTableHeader title="Top Sold Products"  />
      <div>
        <table className="chartTable">
          <thead>
          <tr>
            <th className="item">Item</th>
            <th className="sales">Sales</th>
            <th className="amount">Amount</th>
          </tr>
          </thead>
          <tbody>
          {ordersHealthPlan.map((d) => (
            <tr key={d.productId}>
              <td className="item">{d.productName}</td>
              <td className="sales">{d.sales}</td>
              <td className="amount">{`$${Utils.formatNumber(d.amount)}`}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

TopSoldProducts.propTypes = {
  data: PropTypes.array,
};
TopSoldProducts.defaultProps = {
  data: [],
};

export default TopSoldProducts;
