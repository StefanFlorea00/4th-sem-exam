import React, { useState } from 'react';
import app from '../FirebaseApp';
import { Link } from 'react-router-dom';
import { firestore } from '../FirebaseApp';
import Button from '../Buttons/Button';

type Props = {
  fullname: string;
  profileImg: string;
  text: string;
  time: string;
  uid: string | undefined;
  id?: string;
  deletable?: boolean;
  direction?: 'right' | 'left';
};

function ChatRoomCard(props: Props) {
  const { fullname, profileImg, text, time, uid, id, deletable, direction } =
    props;
  const { currentUser } = app.auth();
  const [showDelete, setShowDelete] = useState(false);

  function handleClick(e: any) {
    const docId = e.target.dataset.id;
    if (currentUser?.uid === uid) {
      deletable &&
        // confirm('Are you sure you want to delete this message?') &&
        firestore.collection('messages').doc(docId).delete();
    }
  }
  function handleBox(e: any) {
    setShowDelete(!showDelete);
  }

  return (
    <div className='chat_card'>
      <li
        className={
          currentUser?.uid === uid && direction === 'right'
            ? 'chat_card_item currentUser'
            : 'chat_card_item'
        }
      >
        <Link to={{ pathname: '/profile/' + uid, state: { uid: uid } }}>
          <h4 className='name'>{fullname}</h4>
        </Link>
        <div className='main_chat'>
          <span className='main_chat_text'>{text}</span>
          {deletable && currentUser?.uid === uid && (
            <div className='dots' onClick={handleBox}>
              ...
            </div>
          )}
          {deletable && showDelete && (
            <div className='delete_box'>
              <Button
                onClick={handleClick}
                text='Delete'
                type='primary'
                id={id}
              />
            </div>
          )}
          <img className='main_chat_img' src={profileImg} alt='profile image' />
        </div>
        <div className='time'> {time}</div>
      </li>
    </div>
  );
}

export default ChatRoomCard;
