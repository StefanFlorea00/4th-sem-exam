import React, { useState, useContext, useEffect } from 'react';
import Signout from './../Assets/Signout';
import Edit from './../Assets/Edit';
import View from './../Assets/View';
import EditProfileInfo from './EditProfileInfo';
import ProfileInfo from './ProfileInfo';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import app from '../FirebaseApp';
import PostList from './PostList';

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileInformation, setProfileInformation] = useState<any>();
  document.title = `Community - ${profileInformation?.fullName}`;


  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setProfileInformation(data);
    });
  }, []);

  function handleSignOut() {
    app.auth().signOut();
    localStorage.setItem('nav', 'home');
  }

  return (
    <>
      <div className='profile'>
        <div className='profile_buttons'>
          <button className='profile_buttons_logout' onClick={handleSignOut}>
            <Signout className='profile_buttons_icon' /> Log out
          </button>
          {editMode ? (
            <button
              className='profile_buttons_edit'
              onClick={() => setEditMode(false)}
            >
              <View className='profile_buttons_icon' /> View Profile
            </button>
          ) : (
            <button
              className='profile_buttons_edit'
              onClick={() => setEditMode(true)}
            >
              <Edit className='profile_buttons_icon' /> Edit
            </button>
          )}
        </div>
        {editMode ? (
          <EditProfileInfo
            profileInfo={profileInformation}
            setEditMode={setEditMode}
          />
        ) : (
          <ProfileInfo
            profileInfo={profileInformation}
            setProfileInformation={setProfileInformation}
          />
        )}
        <PostList userId={currentUser.uid} />
      </div>
    </>
  );
}

export default Profile;
