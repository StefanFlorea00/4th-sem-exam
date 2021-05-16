import React from 'react';
import './ProfileInfo.scss';

function ProfileInfo(props: any) {
  console.log(props.profileInfo)

  return (
    <div>
      <img src={props.profileInfo?.profileImg} alt="User profile image" />
      <h1>{props.profileInfo?.fullname}</h1>
      <h1>{props.profileInfo?.investExp}</h1>
    </div>
  );
}

export default ProfileInfo;
