import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Wrapper from '../components/Wrapper';
import OrdersTable from '../components/OrdersTable';
import Input from '../components/form/Input';
import Datepicker from '../components/form/Datepicker';
import Button from '../components/form/Button';
import Select from '../components/form/Select';
import SeeMore from '../components/SeeMore';
import { getOrdersRequest, usersAutocompleteRequest } from '../store/actions/orders';
import HasPermission from '../components/HasPermission';
import SelectReportPeriodModal from '../components/SelectReportPeriodModal';
import { ReactComponent as DownloadSvg } from '../assets/icons/download.svg';
import Tooltip from '../components/ToolTip';

const options = [
  { label: 'Shipped', value: 'shipped' },
  { label: 'Done', value: 'done' },
  { label: 'Pending', value: 'pending' },
  { label: 'Canceled', value: 'canceled' },
];

function Orders() {
  const ordersTotalPages = useSelector((state) => state.orders.ordersTotalPages);
  const usersAutocomplete = useSelector((state) => state.orders.usersAutocomplete);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectPeriodModal, setSelectPeriodModal] = useState(false);
  const profile = useSelector((state) => state.account.profile);
  const company = profile.userType;

  const dispatch = useDispatch();

  const handleChange = useCallback((key, value) => {
    searchData[key] = value;
    setSearchData({ ...searchData });
  }, [searchData]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    await dispatch(getOrdersRequest({ page, ...searchData }, false));
    setLoading(false);
  }, [searchData]);

  const handleSeeMore = useCallback(() => {
    dispatch(getOrdersRequest({ ...searchData, page: page + 1 }, true));
    setPage(page + 1);
  }, [page]);

  const handleLoadOptions = useCallback(async (value) => {
    const { payload: { data } } = await dispatch(usersAutocompleteRequest(value));
    return data.list || [];
  }, []);

  return (
    <Wrapper>
        <div id="orders">
          <div className="top">
            <form className="forms">
              {+company !== 2 ? (
                <Select
                  loadOptions={handleLoadOptions}
                  label="Search By Patient name"
                  isAsync
                  defaultOptions
                  getOptionLabel={(o) => `${o.fName} ${o.lName}`}
                  getOptionValue={(o) => o.id}
                  onChange={(val) => {
                    if (val) {
                      handleChange('customerId', val.id);
                    } else {
                      handleChange('customerId', null);
                    }
                  }}
                  value={usersAutocomplete.find((u) => u.id === searchData.customerId)}
                />
              ) : null}

              <Datepicker
                isClearable
                label="Search By Date"
                onChange={(val) => handleChange('day', val ? moment(val).format('YYYY-MM-DD') : null)}
                value={searchData.day ? moment(searchData.day, 'YYYY-MM-DD').toDate() : null}
                showYearDropdown
                yearDropdownItemNumber={70}
              />
              <Input
                label="Search By Number"
                placeholder="200001"
                onChange={(ev) => handleChange('sItemNumber', ev.target.value)}
                value={searchData.sItemNumber}
                clearValue={() => handleChange('sItemNumber', '')}
              />
              <Input
                label="Search By Product Name"
                placeholder="Product Name"
                onChange={(ev) => handleChange('sProductName', ev.target.value)}
                value={searchData.sProductName}
                clearValue={() => handleChange('sProductName', '')}
              />
              <Select
                options={options}
                label="Search By Status"
                isSearchable={false}
                onChange={(val) => {
                  if (val) {
                    handleChange('status', val.value);
                  } else {
                    handleChange('status', '');
                  }
                }}
                value={options.find((o) => searchData.status === o.value)}
              />
              <Button
                type="submit"
                title="SEARCH"
                onClick={handleSearch}
                loading={loading}
              />

              {+company === 2 ? (
                <Tooltip
                  width="100%"
                  text={(
                    <span>
                      Export
                    </span>
                )}
                >
                  <div className="actionsDow">
                      <div
                        className="downloadBtn"
                        onClick={() => setSelectPeriodModal(true)}
                        role="button"
                        tabIndex={-1}
                      >
                        <DownloadSvg className="downloadSvg" />
                      </div>
                  </div>
                </Tooltip>
              ) : null}

            </form>
          </div>
          <OrdersTable />
          {+ordersTotalPages > 1 && +ordersTotalPages > page ? <SeeMore onClick={handleSeeMore} /> : null}
        </div>

      <SelectReportPeriodModal
        allOrders
        isOpen={selectPeriodModal}
        onClose={() => setSelectPeriodModal(false)}
      />
    </Wrapper>
  );
}

export default Orders;
