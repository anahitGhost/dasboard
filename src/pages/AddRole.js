import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../components/Wrapper';
import Input from '../components/form/Input';
import Checkbox from '../components/form/Checkbox';
import Button from '../components/form/Button';
import {
  createRoleRequest, getRolesRequest, getScopesRequest, updateRoleRequest,
} from '../store/actions/roles';
import Loader from '../components/Loader';
import HasPermission from '../components/HasPermission';

function AddRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roleId } = useParams();

  const [name, setName] = useState('');
  const [scopes, setScopes] = useState([]);
  const [loading, setLoading] = useState(false);

  const scopesList = useSelector((state) => state.roles.scopes);
  const roles = useSelector((state) => state.roles.roles);
  const scopesStatus = useSelector((state) => state.roles.scopesStatus);

  console.log(scopesList);

  useEffect(() => {
    dispatch(getScopesRequest());
  }, []);

  useEffect(() => {
    (async () => {
      if (roleId) {
        if (_.isEmpty(roles)) {
          await dispatch(getRolesRequest());
        } else {
          const role = roles.find((r) => r.id === roleId);
          setName(role.name);
          setScopes(role.scopes);
        }
      }
    })();
  }, [roleId, roles]);

  const handleScopeChange = useCallback((scope) => {
    let checkedScopes = scopes;
    if (checkedScopes.includes(scope)) {
      checkedScopes = checkedScopes.filter((s) => s !== scope);
    } else {
      checkedScopes = [...checkedScopes, scope];
    }
    setScopes(checkedScopes);
  }, [scopes]);

  const handleCreateRole = useCallback(async (ev) => {
    ev.preventDefault();
    setLoading(true);
    if (roleId) {
      const { payload: { data } } = await dispatch(updateRoleRequest({ id: roleId, name, scopes }));
      if (data.status === 'ok') {
        toast.success('Successfully updated');
        navigate('/roles');
      } else {
        toast.error(data.message);
      }
    } else {
      const { payload: { data } } = await dispatch(createRoleRequest({ name, scopes }));
      if (data.status === 'ok') {
        toast.success('Successfully created');
        navigate('/roles');
      } else {
        toast.error(data.message);
      }
    }
    setLoading(false);
  }, [name, scopes, roleId]);

  return (
    <Wrapper>
      <HasPermission edit={['CREATE_ROLES', 'UPDATE_AND_DELETE_ROLES']}>
        <div id="addRole">
          <h2>{roleId ? 'Update role' : 'Add new role'}</h2>
          {scopesStatus === 'ok' ? (
            <form onSubmit={handleCreateRole}>
              <Input
                label="Role name"
                onChange={(ev) => setName(ev.target.value)}
                value={name}
              />
              {scopesList.map((s) => (
                <div key={s.groupName} className="scopes_wrapper">
                  {!_.isEmpty(s.scopes) && <p className="scopes_group_name">{s.groupName}</p>}

                  <div className="scopes">
                    {s.scopes.map((scope) => (
                      <Checkbox
                        label={_.upperFirst(_.lowerCase(_.startCase(scope)))}
                        onChange={() => handleScopeChange(scope)}
                        checked={scopes.includes(scope)}
                        key={scope}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="actions">
                <Button
                  title={roleId ? 'Update' : 'Save'}
                  type="submit"
                  disabled={!name || _.isEmpty(scopes)}
                  loading={loading}
                />
              </div>
            </form>
          ) : <Loader />}
        </div>
      </HasPermission>
    </Wrapper>
  );
}

export default AddRole;
