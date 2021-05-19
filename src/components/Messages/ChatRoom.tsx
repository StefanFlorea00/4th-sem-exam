import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import app from '../FirebaseApp';
import firebase from 'firebase/app';

type Props = {
  selectedRoom: string;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
};

function ChatRoom(props: Props) {
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<undefined | any>(undefined);
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  useEffect(() => {
    if (currentUser) {
      getDoc(currentUser).then(data => setUserInfo(data));
    }
  }, []);

  console.log(userInfo);

  async function handleInput(e: React.SyntheticEvent) {
    e.preventDefault();
    const collection = app.firestore().collection('messages');

    if (currentUser && userInfo) {
      await collection.add({
        uid: currentUser.uid,
        email: userInfo.email,
        profileImg:
          userInfo.profileImg ||
          'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        text: textAreaValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        chatroom: props.selectedRoom,
      });
    }
  }
  return (
    <div className='chat_room'>
      <form className='chat_form' onSubmit={handleInput}>
        <textarea
          value={textAreaValue}
          onInput={e => setTextAreaValue(e.target.value)}
        ></textarea>

        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
