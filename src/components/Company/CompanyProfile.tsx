import React from 'react';
import {useParams} from 'react-router-dom';
import app from '../FirebaseApp';
import './CompanyProfile.scss';

function CompanyProfile(props: any) {

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
      <>
    <div className='company-profile'>
      <h1>{props.match.params.id}</h1>
    </div>
    </>
  );
}

export default CompanyProfile;
