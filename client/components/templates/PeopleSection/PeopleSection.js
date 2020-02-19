import React from 'react';

import GeneralProfile from '_organisms/GeneralProfile';
import PeopleDirectory from '_organisms/PeopleDirectory';

export default function PeopleSection() {
  return (
    <div className="people-section">
      <PeopleDirectory />
    </div>
  );
}
