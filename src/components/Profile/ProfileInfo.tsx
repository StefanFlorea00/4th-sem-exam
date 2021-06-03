import React, {useEffect, useContext} from 'react';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import app from '../FirebaseApp';

export type Props = {
  profileInfo: {fullname: string, email: string, description: string, investExp: string, profileImg: string, createdAt: {seconds: number, nanoseconds: number}};
  setProfileInformation: ((arg0: any) => void)
};

function ProfileInfo(props: Props) {
  const { currentUser } = useContext(AuthContext);
  document.title = `Community - ${props.profileInfo?.fullname}`;

  console.log(props.profileInfo)
  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      props.setProfileInformation(data);
    });
  }, []);

  return (
    <div className='profile-details'>
      <div className='profile-details_flex'>
        <img src={props.profileInfo?.profileImg ? props.profileInfo?.profileImg : 'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'} alt="User profile image" />
        <div className='profile-details_flex_head'>
          <h1>{props.profileInfo?.fullname}</h1>
          <h2>{props.profileInfo?.investExp}</h2>
        </div>
      </div>
      <div className='profile-details_desc'>
        <p>{props.profileInfo?.description ? props.profileInfo?.description : 'Your description...'}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
