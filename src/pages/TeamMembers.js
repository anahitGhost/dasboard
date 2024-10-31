import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Wrapper from '../components/Wrapper';
import Button from '../components/form/Button';
import { ReactComponent as AddSvg } from '../assets/icons/add.svg';
import { ReactComponent as Edit } from '../assets/icons/edit.svg';
import { ReactComponent as Remove } from '../assets/icons/dlete.svg';
import Checkbox from '../components/form/Checkbox';
import { getMembersListRequest, removeMembersRequest } from '../store/actions/members';
import userImg from '../assets/images/user.svg';
import Loader from '../components/Loader';
import ConfirmationModal from '../components/ConfirmationModal';
import HasPermission from '../components/HasPermission';

function TeamMembers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkedMembers, setCheckedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [teamMemberId, setTeamMemberId] = useState(null);

  const teamMembers = useSelector((state) => state.members.teamMembers);
  const teamMembersStatus = useSelector((state) => state.members.teamMembersStatus);

  useEffect(() => {
    dispatch(getMembersListRequest());
  }, []);

  const handleChange = useCallback((id) => {
    let stateData = [...checkedMembers];
    if (!stateData.includes(id)) {
      stateData.push(id);
    } else {
      stateData = stateData.filter((i) => i !== id);
    }
    setCheckedMembers(stateData);
  }, [checkedMembers]);

  const selectAll = useCallback(() => {
    if (checkedMembers.length === teamMembers.length) {
      setCheckedMembers([]);
    } else {
      setCheckedMembers(teamMembers.map((c) => c.id));
    }
  }, [checkedMembers, teamMembers]);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    const { payload: { data } } = await dispatch(removeMembersRequest(
      deleteSelected ? checkedMembers : [teamMemberId],
    ));

    if (data.status === 'ok') {
      toast.success('Successfully deleted.');
      setTeamMemberId(null);
      setDeleteSelected(false);
      await dispatch(getMembersListRequest());
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }, [teamMemberId, checkedMembers, deleteSelected]);

  return (
    <Wrapper>
      <HasPermission edit={['CREATE_TEAM_MEMBER', 'DELETE_TEAM_MEMBER', 'UPDATE_TEAM_MEMBER', 'VIEW_TEAM_MEMBERS', 'VIEW_TEAM_MEMBERS_DETAILS_PAGE']}>
        <div className="team_members_wrapper">
          <div className="top">
            <p className="page_title">
              Team members
            </p>
            <HasPermission edit="CREATE_TEAM_MEMBER">
              <Link to="/team-members/create">
                <Button title="Add team member" icon={<AddSvg />} className="green team_member_btn" />
              </Link>
            </HasPermission>
          </div>
          <HasPermission edit="DELETE_TEAM_MEMBER">
            {teamMembersStatus === 'ok' && !_.isEmpty(teamMembers) ? (
              <div className="top_buttons_block">
                <Checkbox
                  label="Select All"
                  onChange={selectAll}
                  checked={checkedMembers.length === teamMembers.length}
                />
                {checkedMembers.length
                  ? (
                    <button type="button" className="delete_members_btn" onClick={() => setDeleteSelected(true)}>
                      Delete
                      selected
                    </button>
                  )
                  : null}
              </div>
            ) : null}
          </HasPermission>
          <div className="members_list">
            {teamMembersStatus === 'ok' && !_.isEmpty(teamMembers) ? teamMembers.map((member) => (
              <div key={member.id} className="member_block">
                <div className="header">
                  <Checkbox checked={checkedMembers.includes(member.id)} onChange={() => handleChange(member.id)} />
                  <div>
                    <HasPermission edit="UPDATE_TEAM_MEMBER">
                      <Edit onClick={() => navigate(`/team-members/${member.id}`)} />
                    </HasPermission>
                    <HasPermission edit="DELETE_TEAM_MEMBER">
                      <Remove onClick={() => setTeamMemberId(member.id)} />
                    </HasPermission>
                  </div>
                </div>

                <img src={member.avatar || userImg} alt="avatar" />
                <p
                  className="members_name"
                >
                  {`${member.fName} ${member.lName}`}
                </p>
                <p className="members_type">{member.role.publicName}</p>
              </div>
            )) : null}
            {teamMembersStatus === 'ok' && _.isEmpty(teamMembers) ? <div className="noData">No data</div> : null}
            {teamMembersStatus === 'request' ? <Loader /> : null}
          </div>
        </div>

        <ConfirmationModal
          open={teamMemberId || deleteSelected}
          onConfirm={handleDelete}
          onClose={() => {
            setTeamMemberId(null);
            setDeleteSelected(false);
          }}
          loading={loading}
        >
          <p className="text">
            {`Are you sure to delete ${deleteSelected && checkedMembers.length > 1
              ? 'this members'
              : 'this member'}?`}
          </p>
        </ConfirmationModal>
      </HasPermission>
    </Wrapper>
  );
}

export default TeamMembers;
