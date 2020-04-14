import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import * as R from 'ramda';

import StaffSection from '_templates/StaffSection';
import AddStaffSection from '_templates/AddStaffSection';

export default function StaffPage({ location }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, []);

  return (
    <div className="staff-page page">
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Switch>
                <Route path="/staff/newstaff" component={AddStaffSection} />
                <Route path="*" component={StaffSection} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StaffPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
