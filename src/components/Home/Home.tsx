import React, {useEffect, useState} from 'react';
import {getCollection} from '../FirebaseApp';
import './Home.scss';
import ShareBar from '../Home/ShareBar/ShareBar';
import PostGrid from '../Posts/PostGrid';

function Home() {
  const [posts, setPosts] = useState<any>()

  useEffect(() => {
    getCollection('posts').then((data) => {
      data && setPosts(data.docs)
    })
  }, [])

  return (
    <>
    <div className='home'>
      <ShareBar setPosts={setPosts}/>
      <PostGrid posts={posts}/>
    </div>
    </>
  );
}

export default Home;
