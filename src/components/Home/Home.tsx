import React, { useEffect, useState } from 'react';
import { firestore, getCollection } from '../FirebaseApp';
import ShareBar from '../Home/ShareBar/ShareBar';
import PostGrid from '../Posts/PostGrid';
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export type Posts = {
  comments: Comments;
  content: string;
  createdAt: createdAt;
  media: string;
  companyDesc: string;
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

  document.title = "Community - Home";

  const [posts, setPosts] = useState<null | Posts[]>(null);
  const [snapshots, loading, error] = useCollection(
    firebase.firestore().collection('posts').orderBy('createdAt', 'desc')
  );

  useEffect(() => {
    // @ts-ignore
    snapshots && setPosts(snapshots.docs);
  }, [snapshots]);

  return (
    <>
      <div className='home'>
        <ShareBar setPosts={setPosts} />
        <PostGrid posts={posts} loading={loading} error={error} />
      </div>
    </>
  );
}

export default Home;
