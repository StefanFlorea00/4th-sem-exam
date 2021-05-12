import React from 'react';
import app from '../FirebaseApp';
import './Profile.scss';
import Nav from '../Nav/Nav';

function Profile() {
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
    <>
    <div className='profile'>
      <h1>Profile helloooo</h1>
    </div>
    </>
  );
}

export default Profile;
