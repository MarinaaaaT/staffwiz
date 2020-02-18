import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import * as R from 'ramda';

import PeopleSection from '_templates/PeopleSection';
import AccountSettings from '_templates/AccountSettings';
import SettingsMenu from '_organisms/SettingsMenu';

export default function PeoplePage({ location }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, []);

  return (
    <div className="people-page page">
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Switch>
                <Route path="*" component={PeopleSection} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PeoplePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
