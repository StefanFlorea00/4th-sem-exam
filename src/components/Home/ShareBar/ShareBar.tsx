import React, { useEffect, useState, useContext } from 'react';
import UserButton from '../../Buttons/UserButton';
import ShareBarInput from './ShareBarInput';
import { AuthContext } from '../../../Auth';
import { getDoc } from '../../FirebaseApp';
import app from '../../FirebaseApp';

function ShareBar(props: any) {
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setUserInfo(data);
    });
  }, []);

  return (
    <div className='sharebar'>
      <UserButton userImg={userInfo?.profileImg} />
      <ShareBarInput setPosts={props.setPosts} />
    </div>
  );
}

export default ShareBar;
