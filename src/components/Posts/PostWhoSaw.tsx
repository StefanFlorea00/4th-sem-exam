import React, { useEffect, useState } from 'react';
import { Comments } from '../Home/Home';
import './PostWhoSaw.scss';

type Props = {
  comments: Comments[];
};
function PostWhoSaw(props: Props) {
  const { comments } = props;
  const [uniqArr, setUniqArr] = useState<Comments[] | []>([]);
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
  }, [comments]);

  return (
    <div className='who-saw-div'>
      <div className='user-img-div'>
        {uniqArr &&
          uniqArr.map((comment: Comments) => (
            <img
              key={comment.fullname + Math.random()}
              className='user-img'
              src={comment.profileImg}
            />
          ))}
      </div>
      {uniqArr.length > 0 && <p>+ {uniqArr.length}</p>}
    </div>
  );
}

export default PostWhoSaw;
