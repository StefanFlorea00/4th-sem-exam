import React from 'react';
import app from '../FirebaseApp';
import CompaniesGrid from './CompaniesGrid';
import './Investment.scss';
import testimg from '../Assets/testimg.jpg';

function Investment() {
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  //to get from db later
  const Companies=[
    {name: "Green", field:"Technology", img:{testimg}},
    {name: "Blue", field:"Technology", img:{testimg}},
    {name: "Pink", field:"Cleaning", img:{testimg}},
    {name: "Red", field:"Food", img:{testimg}},
    {name: "I", field:"Ran", img:{testimg}},
    {name: "Out", field:"Of", img:{testimg}},
    {name: "Names", field:"", img:{testimg}},
    {name: "Names", field:"", img:{testimg}},
    {name: "Names", field:"", img:{testimg}},
    {name: "Names", field:"", img:{testimg}},
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
