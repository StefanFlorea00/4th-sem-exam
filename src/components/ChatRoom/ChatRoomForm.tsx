import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import firebase from 'firebase/app';
import Send from '../Assets/Send';

type Props = {
  messageCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  selectedRoom: string;
  scrollIntoView: () => void;
};

function ChatRoomForm(props: Props) {
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<undefined | any>(undefined);
  const [inputValue, setInputValue] = useState<string>('');
  const { messageCollection, selectedRoom, scrollIntoView } = props;

  useEffect(() => {
    if (currentUser) {
      getDoc(currentUser).then(data => setUserInfo(data));
    }
  }, []);

  async function handleInput(e: React.SyntheticEvent) {
    e.preventDefault();

    if (currentUser && userInfo && inputValue) {
      try {
        await messageCollection.add({
          uid: currentUser.uid,
          email: userInfo.email,
          fullname: userInfo.fullname,
          profileImg:
            userInfo.profileImg ||
            'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          text: inputValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          chatroom: selectedRoom,
        });
        setInputValue('');
        scrollIntoView();
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  return (
    <div className='chat_room_form_wrapper'>
      <form className='_form' onSubmit={handleInput}>
        <input
          type='text'
          placeholder='Message'
          value={inputValue}
          onInput={(e: any) => setInputValue(e.target.value)}
        />

        <button>
          <Send />
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoomForm;
