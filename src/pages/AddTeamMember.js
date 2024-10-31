import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../components/Wrapper';
import Button from '../components/form/Button';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { ReactComponent as ImgSvg } from '../assets/icons/img-icon.svg';
import { getRolesRequest } from '../store/actions/roles';
import { addMemberRequest, getSingleMemberRequest, updateMemberRequest } from '../store/actions/members';
import Loader from '../components/Loader';
import ConfirmationModal from '../components/ConfirmationModal';
import HasPermission from "../components/HasPermission";

function AddTeamMember() {
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: '',
    fName: '',
    lName: '',
    email: '',
    roleId: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const roles = useSelector((state) => state.roles.roles);

  useEffect(() => {
    dispatch(getRolesRequest());
  }, []);

  useEffect(() => {
    (async () => {
      if (memberId) {
        setDataLoading(true);
        const { payload: { data } } = await dispatch(getSingleMemberRequest(memberId));
        data.member.roleId = data.member.role.id;
        setFormData(data.member);
        setDataLoading(false);
      }
    })();
  }, [memberId]);

  const handleChange = (key, value) => {
    if (key === 'file') {
      const availableMimeTypes = ['image/png', 'image/jpeg', 'image/png'];
      if (!availableMimeTypes.includes(value.type)) {
        toast.error('Not accepted file type.');
        return;
      }
      value.uri = URL.createObjectURL(value);
    }
    _.unset(errors, key);
    _.set(formData, key, value);
    setFormData({ ...formData });
    setErrors({ ...errors });
  };

  const handleSave = useCallback(async () => {
    setLoading(true);
    let data;
    if (memberId) {
      formData.id = memberId;
      const { payload } = await dispatch(updateMemberRequest(formData));
      data = payload.data;
    } else {
      const { payload } = await dispatch(addMemberRequest(formData));
      data = payload.data;
    }
    if (data.status === 'ok') {
      toast.success(`Successfully ${memberId ? 'updated' : 'created'}.`);
      navigate('/team-members');
    } else if (!_.isEmpty(data.errors)) {
      setErrors(data.errors);
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }, [formData]);

  const getAvatar = useCallback(() => {
    if (formData.file) {
      return formData.file.uri;
    }
    if (formData.avatar) {
      return formData.avatar;
    }
    return undefined;
  }, [formData.file, formData.avatar]);

  return (
    <Wrapper>
      <HasPermission edit={['CREATE_TEAM_MEMBER', 'UPDATE_TEAM_MEMBER', 'VIEW_TEAM_MEMBERS_DETAILS_PAGE']}>
        <div className="team_members_wrapper">
          <div className="top">
            <p className="page_title">
              {`${memberId ? 'Edit' : 'Add'} team member`}
            </p>
            <Button
              title={memberId ? 'Update' : 'Save'}
              className="green team_member_edit_btn"
              onClick={handleSave}
              loading={loading}
            />
          </div>

          {!dataLoading ? (
            <div className="team_members_container">
              <div className="left_block">
                <div className="avatar_edit">
                  {getAvatar() ? <img src={getAvatar()} alt="avatar" /> : <ImgSvg />}
                </div>
                <div className="image-upload">
                  <label htmlFor="file-input_team_member">
                    {`${memberId ? 'Change' : 'Upload'} photo`}
                  </label>
                  <input
                    onChange={(ev) => {
                      handleChange('file', ev.target.files[0]);
                      ev.target.value = '';
                    }}
                    accept=".jpg,.jpeg,.png"
                    id="file-input_team_member"
                    type="file"
                  />
                </div>
                <div className="members_edit_input-container">
                  <span className="input_label">Email</span>
                  <Input
                    value={formData.email}
                    onChange={(ev) => handleChange('email', ev.target.value)}
                    error={errors.email ? 'Please enter a valid email.' : null}
                  />
                </div>
                <Select
                  label="Role"
                  options={roles}
                  onChange={(val) => {
                    if (val) {
                      handleChange('roleId', val.id);
                    } else {
                      handleChange('roleId', null);
                    }
                  }}
                  getOptionValue={(o) => o.id}
                  getOptionLabel={(o) => o.publicName}
                  value={roles.find((r) => r.id === formData.roleId)}
                  error={errors.roleId ? 'Role is required' : null}
                />
                <div className="members_edit_input-container_2">
                  <span className="input_label">First Name</span>
                  <Input
                    value={formData.fName}
                    onChange={(ev) => handleChange('fName', ev.target.value)}
                    error={errors.fName ? 'First name is required' : null}
                  />
                </div>
                <div className="members_edit_input-container_2">
                  <span className="input_label">Last Name</span>
                  <Input
                    value={formData.lName}
                    onChange={(ev) => handleChange('lName', ev.target.value)}
                    error={errors.lName ? 'Last name is required' : null}
                  />
                </div>
              </div>
            </div>
          ) : <Loader />}
        </div>
      </HasPermission>
    </Wrapper>
  );
}

export default AddTeamMember;
