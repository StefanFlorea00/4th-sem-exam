import React, { useEffect } from 'react';
import Post from './Post';
import { Comments } from '../Home/Home';
import LoadingSVG from '../Assets/Loading';

function PostGrid(props: any) {
  return (
    <div className='post-grid'>
      {props.posts ? (
        props.posts.map((post: any) => {
          const comments: Comments[] | [] = post.data().comments;
          return (
            <Post
              key={Math.random() + 'post'}
              uid={post.data().uid}
              content={post.data().content}
              postImage={post.data().media}
              postId={post.id}
              comments={comments}
              companyDesc={post.data().companyDesc}
            />
          );
        })
      ) : (
        <LoadingSVG hasErrorText className='posts-loading' />
      )}
      {props.error && <h3>Error, no content found</h3>}
    </div>
  );
}

export default PostGrid;
