import React from 'react';
import './PostGrid.scss';
import Post from "./Post.tsx";

function PostGrid(props: any) {
  return (
    <div className="post-grid">
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </div>
  );
}

export default PostGrid;
