import React from 'react';
import app from '../FirebaseApp';
import CompaniesGrid from './CompaniesGrid';
import './Investment.scss';

function Investment() {
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  //to get from db later
  const Companies=[
    {name: "Green", field:"Technology"},
    {name: "Blue", field:"Technology"},
    {name: "Pink", field:"Cleaning"},
    {name: "Red", field:"Food"},
    {name: "I", field:"Ran"},
    {name: "Out", field:"Of"},
    {name: "Names", field:""},
  ]

  return (
    <>
    <div className='investment'>
      <div className='description'>
        <h1>Currently available Companies</h1>
        <p>Here you can see a list of companies that are currently available to invest into. Please select a comapny to proceed.</p>
      </div>
      <CompaniesGrid companies={Companies}/>
    </div>
    </>
  );
}

export default Investment;
