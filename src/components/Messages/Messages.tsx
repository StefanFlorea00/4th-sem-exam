import React, { useState } from 'react';
import ChatRoom from './ChatRoom';

function Messages(props) {
  const [selectedRoom, setSelectedRoom] = useState('general');

  return (
    <div className='messages'>
      <ChatRoom selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
    </div>
  );
}

export default Messages;
