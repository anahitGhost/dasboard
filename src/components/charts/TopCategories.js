import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import ChartTableHeader from './ChartTableHeader';
import BarChartRow from './BarChartRow';
import Loader from '../Loader';
import { getOrdersCategoriesRequest } from '../../store/actions/dashboard';


const data = [
  {percentage:10, name:'test1'},
  {percentage:100, name:'test2'},
  {percentage:30, name:'test3'},
  {percentage:50, name:'test4'},
  {percentage:10, name:'test5'},
]

function TopCategories() {

  return (
    <div className="topCompaniesBySales">
      <ChartTableHeader title="Top Category Sold by percentage" />
      {data.map((i, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BarChartRow key={index} percentage={i.percentage} title={i.name} />
      ))}
    </div>
  );
}
export default TopCategories;
