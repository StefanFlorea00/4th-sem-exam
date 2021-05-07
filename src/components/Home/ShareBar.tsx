import React from 'react';
import './ShareBar.scss';
import UserButton from '../Buttons/UserButton';

function ShareBar(props: any) {
  return (
  <div className="sharebar">
      <UserButton hasInfo userInfo={{name:"Jane Doe", desc:"Super cool chick"}}/>
    </div>
  );
}

export default ShareBar;
