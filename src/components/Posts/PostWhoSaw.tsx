import React, { useEffect, useState } from 'react';
import { Comments } from '../Home/Home';

type Props = {
  comments: Comments[];
};
function PostWhoSaw(props: Props) {
  const { comments } = props;
  const [uniqArr, setUniqArr] = useState<Comments[] | []>([]);
  const [commentArr, setCommentArr] = useState<Comments[] | []>(
    uniqArr.slice(0, 3)
  );
  console.log();

  useEffect(() => {
    const getUniqueArr: Comments[] =
      comments &&
      Array.from(
        comments
          .reduce(
            (map: any, obj: Comments) => map.set(obj.profileImg, obj),
            new Map()
          )
          .values()
      );
    setUniqArr(getUniqueArr);
    if (getUniqueArr.length > 3) {
      setCommentArr(getUniqueArr.slice(0, 3));
    }
  }, [comments]);

  return (
    <div className='who-saw-div'>
      <div className='user-img-div'>
        {uniqArr && uniqArr.length <= 3
          ? uniqArr.map((comment: Comments) => (
            <img
              key={comment.fullname + Math.random()}
              className='user-img'
              src={comment.profileImg}
              alt='images of people who commented on the post'
            />
          ))
          : commentArr.map((comment: Comments) => (
            <img
              key={comment.fullname + Math.random()}
              className='user-img'
              src={comment.profileImg}
              alt='images of people who commented on the post'

            />
          ))}
      </div>
      {uniqArr.length > 3 && <p>+ {uniqArr.length - commentArr.length}</p>}
    </div>
  );
}

export default PostWhoSaw;
