import React, { useEffect, useState } from 'react';
import UserButton from '../Buttons/UserButton';
import Button from '../Buttons/Button';
import './Post.scss';
import PostWhoSaw from './PostWhoSaw';
import { firestore } from '../FirebaseApp';
import { getDoc } from '../FirebaseApp';
import { getCollection } from '../FirebaseApp';
import * as firebase from 'firebase/app';
import app from '../FirebaseApp';

export type Props = {
  uid: string;
  postImage: string;
  content: string;
  postId?: string;
};

function Post(props: Props) {
  const [postUser, setPostUser] = useState<any>();

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
    const docId = e.target.closest('.post')?.dataset.id;
    const { text } = e.target.elements;
    const currentUser = app.auth().currentUser;

    if (currentUser && postUser) {
      try {
        await firestore
          .collection('posts')
          .doc(docId)
          .update({
            comments: firebase.default.firestore.FieldValue.arrayUnion({
              text: text.value,
              commentorUid: currentUser.uid,
              ...postUser,
              createdAt: new Date(),
            }),
          });

        getCollection('posts').then(data =>
          data?.docs.map(el => console.log(el.data()))
        );
      } catch (error) {
        throw new Error(error.message);
      }
    }
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
          <input type='text' name='text' placeholder='Comment' />
          {/* <PostWhoSaw/> */}
          <Button type='primary' text='Comment' />
        </form>
      </div>
    </div>
  );
}

export default Post;
