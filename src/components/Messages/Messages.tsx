import React, { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from '../FirebaseApp';

function Messages(props) {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const messageCollection = app.firestore().collection('messages');

  const dbQuery = messageCollection.where('chatroom', '==', selectedRoom);
  const [messages] = useCollectionData(dbQuery, { idField: 'id' });

  console.log(messages);

  return (
    <div className='messages'>
      <ChatRoom
        selectedRoom={selectedRoom}
        messageCollection={messageCollection}
      />
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
    </div>
  );
}

export default Messages;
