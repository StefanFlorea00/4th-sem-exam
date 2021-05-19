import React, { useState, useEffect } from 'react';
import ChatRoomForm from './ChatRoomForm';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from '../FirebaseApp';

function Messages(props) {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const messageCollection = app.firestore().collection('messages');

  const dbQuery = messageCollection
    .where('chatroom', '==', selectedRoom)
    .orderBy('createdAt', 'asc');

  const [messages] = useCollectionData(dbQuery, { idField: 'id' });

  console.log(messages);

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
        selectedRoom={selectedRoom}
        messageCollection={messageCollection}
      />
    </div>
  );
}

export default Messages;
