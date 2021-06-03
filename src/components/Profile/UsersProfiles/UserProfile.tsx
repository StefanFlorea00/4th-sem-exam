import React, {useState, useEffect} from 'react';
import {getDoc} from '../../FirebaseApp';
import { useHistory } from "react-router-dom";
import PostList from '../PostList'

function Profile(props: any) {
  let history = useHistory();
  const [profileInformation, setProfileInformation] = useState<any>()

  useEffect(() => {
    getDoc(props.location.state).then(data => {
      setProfileInformation(data);
    });
  }, []);

  return (
    <div className='profile'>
      <button className='profile-button' onClick={history.goBack}>Back</button>
      <div className='profile-details'>
        <div className='profile-details_flex'>
          <img src={profileInformation?.profileImg ? profileInformation?.profileImg : 'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'} alt="User profile image" />
          <div className='profile-details_flex_head'>
            <h1>{profileInformation?.fullname}</h1>
            <h2>{profileInformation?.investExp}</h2>
          </div>
        </div>
        <div className='profile-details_desc'>
          <p>{profileInformation?.description ? profileInformation?.description : 'Your description...'}</p>
        </div>
        <PostList userId={props.location.state.uid}/>
      </div>
    </div>
  );
}

export default Profile;
