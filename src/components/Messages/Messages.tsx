import React, { useState, useRef } from 'react';
import ChatRoomForm from './ChatRoomForm';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from '../FirebaseApp';
import firebase from 'firebase/app';
import ChatRoomCard from './ChatRoomCard';

function Messages(props) {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const messageCollection = app.firestore().collection('messages');
  const scrollViewDiv = useRef();

  const dbQuery = messageCollection
    .where('chatroom', '==', selectedRoom)
    .orderBy('createdAt', 'asc');

  const [messages] = useCollectionData(dbQuery, { idField: 'id' });
  console.log(messages);

  console.log(messages);

  function scrollIntoView() {
    scrollViewDiv?.current?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className='messages'>
      {/* chatRoom cards */}
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
            // <div>
            //   <h1>{user.fullname}</h1>
            //   <h2>{user.text}</h2>
            //   <img src={user.profileImg} />
            // </div>
            <ChatRoomCard
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
      <div ref={scrollViewDiv}></div>
    </div>
  );
}

export default Messages;
