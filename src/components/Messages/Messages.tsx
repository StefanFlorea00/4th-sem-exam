import React, { useState, useRef } from 'react';
import ChatRoomForm from './ChatRoomForm';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from '../FirebaseApp';

function Messages(props) {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const messageCollection = app.firestore().collection('messages');
  const scrollViewDiv = useRef();

  const dbQuery = messageCollection
    .where('chatroom', '==', selectedRoom)
    .orderBy('createdAt', 'asc');

  const [messages] = useCollectionData(dbQuery, { idField: 'id' });

  console.log(messages);

  function handleClick() {
    scrollViewDiv.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className='messages'>
      {/* chatRoom cards */}
      {/* messages arr */}
      {messages &&
        messages.map(user => {
          return (
            <div>
              <h1>{user.fullname}</h1>
              <h2>{user.text}</h2>
              <img src={user.profileImg} />
            </div>
          );
        })}
      {/* form */}

      <ChatRoomForm
        handleClick={handleClick}
        selectedRoom={selectedRoom}
        messageCollection={messageCollection}
      />
      <div ref={scrollViewDiv}></div>
    </div>
  );
}

export default Messages;
