import React, {useEffect, useState} from 'react';
import UserButton from '../Buttons/UserButton';
import Button from '../Buttons/Button';
import './Post.scss';
import PostWhoSaw from './PostWhoSaw';
import { firestore } from '../FirebaseApp';

export type Props = {
  uid: string
  postImage: string;
  content: string;
};

function Post(props: Props) {
  const [postUser, setPostUser] = useState<any>()

  useEffect(() => {
    firestore.collection('users').doc(props.uid).get().then((data) => {
      data && setPostUser(data.data())
      console.log(data.data())
    });
  }, [])

  return (
    <div className={props.postImage ? "post with-img" : "post"}>
        <UserButton hasInfo userInfo={{name:postUser?.fullname, exp:postUser?.investExp}} userImg={postUser?.profileImg}/>
        {props.postImage && <img className="post-img" src={props.postImage} alt="Post image"/>}
        <p className="post-content">{props.content}</p>
        <div className="bottom-div">
          <Button type="primary" imgPos="left" img="commentImg" text="Add a comment"/>
          <PostWhoSaw/>
        </div>
    </div>
  );
}

export default Post;
