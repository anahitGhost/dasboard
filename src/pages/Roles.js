import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Wrapper from '../components/Wrapper';
import Button from '../components/form/Button';
import { ReactComponent as AddSvg } from '../assets/icons/add.svg';
import { deleteRoleRequest, getRolesRequest } from '../store/actions/roles';
import { ReactComponent as EditSvg } from '../assets/icons/edit.svg';
import { ReactComponent as DeleteSvg } from '../assets/icons/dlete.svg';
import Loader from '../components/Loader';
import ConfirmationModal from '../components/ConfirmationModal';
import HasPermission from '../components/HasPermission';

function Roles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [roleId, setRoleId] = useState(null);

  const roles = useSelector((state) => state.roles.roles);
  const rolesStatus = useSelector((state) => state.roles.rolesStatus);

  useEffect(() => {
    dispatch(getRolesRequest());
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    const { payload: { data } } = await dispatch(deleteRoleRequest(roleId));
    if (data.status === 'ok') {
      await dispatch(getRolesRequest());
      toast.success('Successfully deleted.');
      setRoleId(null);
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }, [roleId]);

  return (
    <Wrapper>
      <HasPermission edit={['CREATE_ROLES', 'UPDATE_AND_DELETE_ROLES', 'VIEW_ROLES_PAGE']}>
        <div id="roles">
          <div className="top">
            <HasPermission edit="CREATE_ROLES">
              <Link to="/roles/create">
                <Button
                  title="Add new role"
                  className="green"
                  icon={<AddSvg />}
                />
              </Link>
            </HasPermission>
          </div>
          {rolesStatus === 'ok' && !_.isEmpty(roles) ? (
            <div className="table rolesTable">
              <div className="head">
                <div className="name">Role name</div>
                <div className="status">Status</div>
                <div className="actions" />
              </div>
              <div className="body">
                {roles.map((role) => (
                  <div className="row" key={role.id}>
                    <div className="name">
                      {role.publicName}
                    </div>
                    <div className="status">
                      {_.upperFirst(role.status)}
                    </div>
                    <HasPermission edit="UPDATE_AND_DELETE_ROLES">
                      <div className="actions">
                        <div onClick={() => navigate(`/roles/edit/${role.id}`)} role="button" tabIndex={-1}>
                          <EditSvg />
                        </div>
                        <div onClick={() => setRoleId(role.id)} role="button" tabIndex={-1}>
                          <DeleteSvg />
                        </div>
                      </div>
                    </HasPermission>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {rolesStatus === 'request' ? <Loader /> : null}
          {rolesStatus === 'ok' && _.isEmpty(roles) ? <div className="noData">No data</div> : null}
        </div>
        <ConfirmationModal
          open={roleId}
          onConfirm={handleDelete}
          onClose={() => setRoleId(null)}
          loading={loading}
        >
          <p className="text">Are you sure to delete this role?</p>
        </ConfirmationModal>
      </HasPermission>
    </Wrapper>
  );
}

export default Roles;
