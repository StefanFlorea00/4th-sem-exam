import React from 'react';
import './ProfileInfo.scss';

export type Props = {
  profileInfo: any;
};

function ProfileInfo(props: Props) {

  return (
    <div>
      <img src={props.profileInfo?.profileImg} alt="User profile image" />
      <h1>{props.profileInfo?.fullname}</h1>
      <h1>{props.profileInfo?.investExp}</h1>
      <p>{props.profileInfo?.description}</p>
    </div>
  );
}

export default ProfileInfo;
