import React from 'react';
import './PostWhoSaw.scss';

function PostWhoSaw(props: any) {
  console.log(props.comments);
  const { comments } = props;

  return (
    <div className='who-saw-div'>
      <div className='user-img-div'>
        {comments &&
          comments.map(comment => (
            <img className='user-img' src={comment.profileImg} />
          ))}
        {/* <img className="user-img" src="userImg"/>
      <img className="user-img" src="userImg"/>
      <img className="user-img" src="userImg"/> */}
      </div>
      <p>+ 13</p>
    </div>
  );
}

export default PostWhoSaw;
