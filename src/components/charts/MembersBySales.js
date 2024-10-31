import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChartTableHeader from './ChartTableHeader';
import { getOrdersMembersRequest } from '../../store/actions/dashboard';
import user from '../../assets/images/user.svg';
import Loader from '../Loader';
import _ from "lodash";

const ordersMembers = [
  {fName:'Jack', lName:"Jonas",},
  {fName:'Jack', lName:"Jonas",},
  {fName:'Jack', lName:"Jonas",},
  {fName:'Jack', lName:"Jonas",},
  {fName:'Jack', lName:"Jonas",},
]

function MembersBySales() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrdersMembersRequest({
      startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }));
  }, []);

  const sortData = async (reqData) => {
    setLoading(true);
    await dispatch(getOrdersMembersRequest(reqData));
    setLoading(false);
  };

  return (
    <div className="membersBySales chartTableContainer">
      <ChartTableHeader changeValue={sortData} title="Members by sales" />
      <div>
        <table className="chartTable">
          <tbody>
          { ordersMembers?.map((d, i) => (
                <tr key={d.customerId}>
                  <td className="index">{i + 1}</td>
                  <td className="memberInfo" onClick={() => navigate(`/patients/${d.customerId}`)}>
                    <div>
                      <div className="imageBlock">
                        <img src={d.avatar || user} alt="" />
                      </div>
                      <div>
                        <p className="name">
                          {d.fName}
                          {' '}
                          {d.lName}
                        </p>
                         <p className="sickness">{d.lName}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersBySales;
