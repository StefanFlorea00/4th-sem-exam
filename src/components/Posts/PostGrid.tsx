import React from 'react';
import './PostGrid.scss';
import Post from "./Post";

function PostGrid(props: any) {
  
  return (
    <div className="post-grid">
        {props.posts ? props.posts.map((post: any) => {
          return <Post key={Math.random()+'post'} uid={post.data().uid} content={post.data().content} postImage={post.data().media}/>
        }) :
        <h3>No content found</h3>}
    </div>
  );
}

export default PostGrid;
