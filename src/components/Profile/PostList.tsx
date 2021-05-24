import React, {useEffect, useState} from 'react';
import './PostList.scss';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from '../FirebaseApp';
import Post from '../Posts/Post'

function PostList(props: any) {
  const postCollection = app.firestore().collection('posts');

  const dbQuery = postCollection
    .where('uid', '==', props.userId);

  const [posts] = useCollectionData(dbQuery, { idField: 'id' });

  return (
    <div className='profile-posts'>
      <h2 className='profile-posts_header'>Posts</h2>
      <div className='profile-posts_list'>
        {posts && posts.length !== 0 ? posts.map((post)=>{
         return <Post key={Math.random() + 'post'} uid={post.uid} content={post.content} postImage={post.media} postId={post.id}/>
        }) : <h3>Currently empty</h3>}
      </div>
    </div>
  );
}

export default PostList;
