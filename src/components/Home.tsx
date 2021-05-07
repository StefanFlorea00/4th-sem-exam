import React from 'react';
import app from './FirebaseApp';
import Sidebar from './Sidebar/Sidebar';
import './Home.scss';
import ShareBar from './Home/ShareBar/ShareBar';
import PostGrid from './Posts/PostGrid';


function Home() {
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
    <>
    <Sidebar/>
    <div className='home'>
      {/* <h1> Home</h1> */}
      <ShareBar/>
      <PostGrid/>
      <button onClick={handleSignOut}> Log out </button>
    </div>
    </>
  );
}

export default Home;
