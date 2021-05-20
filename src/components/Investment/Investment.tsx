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
    {id:"0", name: "Green", field:"Technology", img:{testimg}},
    {id:"1", name: "Blue", field:"Technology", img:{testimg}},
    {id:"2", name: "Pink", field:"Cleaning", img:{testimg}},
    {id:"3", name: "Red", field:"Food", img:{testimg}},
    {id:"4", name: "I", field:"Ran", img:{testimg}},
    {id:"5", name: "Out", field:"Of", img:{testimg}},
    {id:"6", name: "Names", field:"", img:{testimg}},
    {id:"7", name: "Names", field:"", img:{testimg}},
    {id:"8", name: "Names", field:"", img:{testimg}},
    {id:"9", name: "Names", field:"", img:{testimg}},
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
