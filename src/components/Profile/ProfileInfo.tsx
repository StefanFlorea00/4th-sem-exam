import React, {useEffect, useContext} from 'react';
import './ProfileInfo.scss';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import app from '../FirebaseApp';

export type Props = {
  profileInfo: any;
  setProfileInformation: ((arg0: any) => void)
};

function ProfileInfo(props: Props) {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      props.setProfileInformation(data);
    });
  }, []);

  return (
    <div className='profile-details'>
      <div className='profile-details_flex'>
        <img src={props.profileInfo?.profileImg} alt="User profile image" />
        <div className='profile-details_flex_head'>
          <h1>{props.profileInfo?.fullname}</h1>
          <h2>{props.profileInfo?.investExp}</h2>
        </div>
      </div>
      <div className='profile-details_desc'>
        <p>{props.profileInfo?.description}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
