import React from 'react';
import app from '../FirebaseApp';
import './Home.scss';
import ShareBar from '../Home/ShareBar/ShareBar';
import PostGrid from '../Posts/PostGrid';
import Nav from '../Nav/Nav';

function Home() {
  return (
    <>
    <div className='home'>
      {/* <h1> Home</h1> */}
      <ShareBar/>
      <PostGrid/>
    </div>
    </>
  );
}

export default Home;
