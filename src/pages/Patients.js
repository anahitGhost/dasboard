import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Wrapper from '../components/Wrapper';
import Input from '../components/form/Input';
import Datepicker from '../components/form/Datepicker';
import Button from '../components/form/Button';
import PatientsTable from '../components/PatientsTable';
import SeeMore from '../components/SeeMore';
import { getPatientsRequest } from '../store/actions/patients';
import HasPermission from "../components/HasPermission";

function Patients() {
  const params = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({});

  const totalPages = useSelector((state) => state.patients.totalPages);

  useMemo(() => {
    setSearchData({
      sName: '', dob: '', sAddress: '', sPhone: '',
    });
  }, [params.type]);

  const handleChange = useCallback((key, value) => {
    searchData[key] = value;
    setSearchData({ ...searchData });
  }, [searchData]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    searchData.startDOB = searchData.dob;
    searchData.endDOB = searchData.dob;
    await dispatch(getPatientsRequest({ ...searchData }));
    setLoading(false);
  }, [searchData]);

  const handleSeeMore = useCallback(() => {
    dispatch(getPatientsRequest({ ...searchData, page: page + 1 }));
    setPage(page + 1);
  }, [page]);

  return (
    <Wrapper>
      <div id="patients">
        <div className="top">
          <form className="forms">
            <Input
              label="Search By Name"
              placeholder="Name or Surname"
              onChange={(ev) => handleChange('sName', ev.target.value)}
              value={searchData.sName}
              clearValue={() => handleChange('sName', '')}
            />
            <Datepicker
              isClearable
              label="Search By Date"
              onChange={(val) => handleChange('dob', val ? moment(val).format('YYYY-MM-DD') : null)}
              value={searchData.dob ? moment(searchData.dob, 'YYYY-MM-DD').toDate() : null}
              showYearDropdown
              yearDropdownItemNumber={70}
            />
            <Input
              label="Search By Address"
              placeholder="Address or City"
              onChange={(ev) => handleChange('sAddress', ev.target.value)}
              value={searchData.sAddress}
              clearValue={() => handleChange('sAddress', '')}
            />
            <Input
              label="Search By Phone"
              placeholder="8182658921"
              onChange={(ev) => handleChange('sPhone', ev.target.value)}
              value={searchData.sPhone}
              type="numeric"
              dataPrepend="+1"
              maxLength="10"
              clearValue={() => handleChange('sPhone', '')}
            />
            <Button title="SEARCH" onClick={handleSearch} loading={loading} type="submit" />
          </form>
        </div>
        <PatientsTable />
        {12 > 1 && 12 > page ? <SeeMore onClick={handleSeeMore} /> : null}
      </div>
    </Wrapper>
  );
}

export default Patients;
