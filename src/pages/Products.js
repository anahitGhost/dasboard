import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceVisible } from 'react-lazyload';
import moment from 'moment';
import _ from 'lodash';
import Wrapper from '../components/Wrapper';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import Button from '../components/form/Button';
import SeeMore from '../components/SeeMore';
import { getProductsRequest } from '../store/actions/products';
import ProductsTable from '../components/ProductsTable';
import useQuery from '../helpers/UseQuery';
import Datepicker from '../components/form/Datepicker';
import HasPermission from '../components/HasPermission';

const options = [
  { label: 'All', value: 'null' },
  { label: 'Active', value: 'active' },
  { label: 'Deactivated', value: 'disabled' },
];

const optionsTopProduct = [
  // { label: 'Top', value: 'null' },
  { label: 'Top Selling', value: 'topSales' },
];

function Products() {
  const { query, setQuery } = useQuery();
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const productsTotalPages = useSelector((state) => state.products.productsTotalPages);
  const productsTotal = useSelector((state) => state.products.productsTotal);
  const nextOffset = useSelector((state) => state.products.nextOffset);

  const handleSeeMore = useCallback(() => {
    dispatch(getProductsRequest({ ...searchData, nextOffset }));
    setPage(page + 1);
  }, [page, nextOffset]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      if (!_.isEmpty(query)) {
        setSearchData(query);
      }
    }
  }, [query]);

  const handleChange = useCallback((key, value) => {
    if (key === 'date') {
      searchData.startDate = moment(value[0]).format('YYYY-MM-DD');

      searchData.endDate = value[1] ? moment(value[1]).format('YYYY-MM-DD') : null;
    } else {
      if (key === 'orderBy' && value !== 'topSales') {
        delete searchData.startDate;
        delete searchData.endDate;
      }

      searchData[key] = value;
    }

    setSearchData({ ...searchData });
  }, [searchData]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    await dispatch(getProductsRequest({ nextOffset: 0, ...searchData }, false));
    setQuery({ page, ...searchData });
    forceVisible();
    setLoading(false);
  }, [searchData]);

  return (
    <Wrapper>
        <div id="products">
          <div className="top">
            <form className="forms">
              <Input
                label="Search"
                onChange={(ev) => {
                  handleChange('sName', ev.target.value);
                }}
                value={searchData.sName}
                clearValue={() => handleChange('sName', '')}
              />
              <Input
                label="Search By Item"
                onChange={(ev) => {
                  handleChange('sItemNumber', ev.target.value);
                }}
                value={searchData.sItemNumber}
                clearValue={() => handleChange('sItemNumber', '')}
              />
              <Select
                options={options}
                placeholder="Status"
                onChange={(val) => {
                  if (val) {
                    handleChange('status', val.value);
                  } else {
                    handleChange('status', '');
                  }
                }}
                value={options.find((o) => searchData.status === o.value)}
              />

              <Select
                options={optionsTopProduct}
                placeholder="Type"
                onChange={(val) => {
                  if (val) {
                    handleChange('orderBy', val.value);
                  } else {
                    handleChange('orderBy', 'createdAt');
                  }
                }}
                value={optionsTopProduct.find((o) => searchData.orderBy === o.value)}
              />
              <Button
                disabled={searchData.orderBy === 'topSales' && !searchData.endDate}
                type="submit"
                title="SEARCH"
                onClick={handleSearch}
                loading={loading}
              />
            </form>
          </div>
          {searchData.orderBy === 'topSales' && (
          <div className="topDate">
            <div />
            <div />
            <div />
            <div className="datepickerContainer">
              <Datepicker
                style={{ paddingLeft: '14px', fontsize: '14px' }}
                onChange={(date) => handleChange('date', date)}
                label="Search By Date"
                monthsShown={2}
                selectsRange
                // selected={requestCustomDate.startDate}
                startDate={searchData.startDate ? moment(searchData.startDate, 'YYYY-MM-DD').toDate() : null}
                endDate={searchData.endDate ? moment(searchData.endDate, 'YYYY-MM-DD').toDate() : null}
              />
            </div>
          </div>
          )}
          <ProductsTable />
          {+productsTotalPages > 1 && +productsTotal > +nextOffset ? <SeeMore onClick={handleSeeMore} /> : null}
        </div>
    </Wrapper>
  );
}

export default Products;
