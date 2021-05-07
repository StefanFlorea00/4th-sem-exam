import React from 'react';
import './ShareBar.scss';
import UserButton from '../../Buttons/UserButton';
import ShareBarInput from './ShareBarInput';

function ShareBar(props: any) {
  return (
  <div className="sharebar">
      <UserButton/>
      <ShareBarInput/>
    </div>
  );
}

export default ShareBar;
