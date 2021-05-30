import React, { useEffect, useState } from 'react';
import { firestore, getCollection } from '../FirebaseApp';
import './Home.scss';
import ShareBar from '../Home/ShareBar/ShareBar';
import PostGrid from '../Posts/PostGrid';

export type Posts = {
  comments: Comments;
  content: string;
  createdAt: createdAt;
  media: string;
  uid?: string;
};
export type createdAt = { seconds: number; nanoseconds: number };

export type Comments = {
  commentorUid: string;
  createdAt: createdAt;
  description: string;
  email: string;
  fullname: string;
  investExp: string;
  profileImg: string;
  text: string;
};
function Home() {
  const [posts, setPosts] = useState<null | Posts[]>(null);

  useEffect(() => {
    getCollection('posts', true).then(data => {
      //@ts-ignore
      data && setPosts(data.docs);
    });
  }, []);

  return (
    <>
      <div className='home'>
        <ShareBar setPosts={setPosts} />
        <PostGrid posts={posts} />
      </div>
    </>
  );
}

export default Home;
