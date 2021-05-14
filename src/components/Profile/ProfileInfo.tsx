import React from 'react';
import app from '../FirebaseApp';
import './Profile.scss';

function ProfileInfo() {
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
    <>
    <div className='profile-info'>
      <h1>Profile helloooo</h1>
    </div>
    </>
  );
}

export default ProfileInfo;
