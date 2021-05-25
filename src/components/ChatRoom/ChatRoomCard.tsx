import React from 'react';
import app from '../FirebaseApp';
import { Link } from 'react-router-dom';
import { firestore } from '../FirebaseApp';

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
  const css =
    deletable && currentUser?.uid === uid ? {} : { cursor: 'default' };

  function handleClick(e: any) {
    const docId = e.target.dataset.id;

    if (currentUser?.uid === uid) {
      deletable &&
        confirm('Do you want to delete this message?') &&
        firestore.collection('messages').doc(docId).delete();
    }
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
          <span
            className='main_chat_text'
            onDoubleClickCapture={handleClick}
            data-id={id}
            style={css}
          >
            {text}
          </span>
          <img className='main_chat_img' src={profileImg} alt='profile image' />
        </div>
        <div className='time'> {time}</div>
      </li>
    </div>
  );
}

export default ChatRoomCard;
