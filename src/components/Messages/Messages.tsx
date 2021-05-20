import React, { useState, useEffect } from 'react';
import ChatRoomForm from './ChatRoomForm';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from '../FirebaseApp';
import firebase from 'firebase/app';
import ChatRoomCard from './ChatRoomCard';
import Rooms from './Rooms';

function Messages() {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const messageCollection = app.firestore().collection('messages');

  useEffect(() => {
    setTimeout(scrollIntoView, 1000);
  }, []);

  const dbQuery = messageCollection
    .where('chatroom', '==', selectedRoom)
    .orderBy('createdAt', 'asc');

  const [messages] = useCollectionData(dbQuery, { idField: 'id' });
  console.log(messages);

  console.log(messages);

  function scrollIntoView() {
    // window.scrollTo(0, document.body.scrollHeight);
  }
  return (
    <div className='messages'>
      {/* chatRoom cards */}
      <Rooms setSelectedRoom={setSelectedRoom} />
      {/* messages arr */}
      {messages &&
        messages.map(user => {
          const Timestamp = firebase.firestore.Timestamp;
          const getDate = new Timestamp(
            user.createdAt?.seconds,
            user.createdAt?.nanoseconds
          ).toDate();

          const [, month, date, year, hour] = getDate.toString().split(' ');

          const time = `${date} ${month} ${year} ${hour}`;

          return (
            <ChatRoomCard
              key={user.fullname + Math.random()}
              fullname={user.fullname}
              text={user.text}
              profileImg={user.profileImg}
              time={time}
              uid={user.uid}
            />
          );
        })}
      {/* form */}

      <ChatRoomForm
        scrollIntoView={scrollIntoView}
        selectedRoom={selectedRoom}
        messageCollection={messageCollection}
      />
    </div>
  );
}

export default Messages;
