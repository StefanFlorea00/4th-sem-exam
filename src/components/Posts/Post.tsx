import React, { useEffect, useState } from 'react';
import UserButton from '../Buttons/UserButton';
import Button from '../Buttons/Button';
import './Post.scss';
import PostWhoSaw from './PostWhoSaw';
import { firestore } from '../FirebaseApp';
import { getDoc } from '../FirebaseApp';
import { getCollection } from '../FirebaseApp';

import app from '../FirebaseApp';

export type Props = {
  uid: string;
  postImage: string;
  content: string;
  postId?: string;
};

function Post(props: Props) {
  const [postUser, setPostUser] = useState<any>();
  // console.log(getDoc(app.auth().currentUser).then(el => console.log(el)));

  // getCollection('posts').then(data => console.log(data?.docs.map(el => el.id)));

  useEffect(() => {
    firestore
      .collection('users')
      .doc(props.uid)
      .get()
      .then(data => {
        data && setPostUser(data.data());
      });
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    //@ts-ignore
    const docId = (e.target as HTMLElement).closest('.post')?.dataset.id;

    await getCollection('posts')
      .then(data => data?.docs.filter(el => el.id === docId))
      .then(el => el?.forEach(doc => console.log(doc.data())));
  }

  return (
    <div
      className={props.postImage ? 'post with-img' : 'post'}
      data-id={props.postId}
    >
      <UserButton
        hasInfo
        userInfo={{ name: postUser?.fullname, exp: postUser?.investExp }}
        userImg={postUser?.profileImg}
      />
      {props.postImage && (
        <img className='post-img' src={props.postImage} alt='Post image' />
      )}
      <p className='post-content'>{props.content}</p>
      <div className='bottom-div'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Comment' />
          {/* <PostWhoSaw/> */}
          <Button type='primary' text='Comment' />
        </form>
      </div>
    </div>
  );
}

export default Post;
