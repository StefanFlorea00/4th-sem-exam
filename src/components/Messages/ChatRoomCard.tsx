import React from 'react';
import app from '../FirebaseApp';

type Props = {
  fullname: string;
  profileImg: string;
  text: string;
  time: string;
  uid: string;
};

function ChatRoomCard(props: Props) {
  const { fullname, profileImg, text, time, uid } = props;
  const { currentUser } = app.auth();
  console.log(currentUser?.uid === uid);

  return (
    <div className='chat_card'>
      <li
        className={
          currentUser?.uid === uid
            ? 'chat_card_item currentUser'
            : 'chat_card_item'
        }
      >
        <h4 className='name'>{fullname}</h4>
        <div className='main_chat'>
          <span className='main_chat_text'>{text} </span>
          <img className='main_chat_img' src={profileImg} alt='profile image' />
        </div>
        <div className='time'> {time}</div>
      </li>
    </div>
  );
}

export default ChatRoomCard;
