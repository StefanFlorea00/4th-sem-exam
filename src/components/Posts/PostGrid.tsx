import React, { useEffect } from 'react';
import './PostGrid.scss';
import Post from './Post';

function PostGrid(props: any) {
  useEffect(() => {
    console.log(props.posts && props.posts.map(el => el.data()));
  }, [props.posts]);
  return (
    <div className='post-grid'>
      {props.posts ? (
        props.posts.map((post: any) => {
          const comments = post.data().comments;
          return (
            <Post
              key={Math.random() + 'post'}
              uid={post.data().uid}
              content={post.data().content}
              postImage={post.data().media}
              postId={post.id}
              comments={comments}
            />
          );
        })
      ) : (
        <h3>No content found</h3>
      )}
    </div>
  );
}

export default PostGrid;
