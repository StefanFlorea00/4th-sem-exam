import React from 'react';
import './PostWhoSaw.scss';

function PostWhoSaw(props: any) {
  return (
  <div className="who-saw-div">
      <div className="user-img-div">
      <img className="user-img" src="userImg"/>
      <img className="user-img" src="userImg"/>
      <img className="user-img" src="userImg"/>
      </div>
      <p>+ 13</p>
    </div>
  );
}

export default PostWhoSaw;
