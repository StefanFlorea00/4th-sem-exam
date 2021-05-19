import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import firebase from 'firebase/app';

type Props = {
  messageCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  selectedRoom: string;
  handleClick: () => void;
};

function ChatRoomForm(props: Props) {
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<undefined | any>(undefined);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const { messageCollection, selectedRoom, handleClick } = props;

  useEffect(() => {
    if (currentUser) {
      getDoc(currentUser).then(data => setUserInfo(data));
    }
  }, []);

  // props.setMessagesArr(messages);

  // props.setMessagesArr(useCollectionData(dbQuery, { idField: 'id' }));

  async function handleInput(e: React.SyntheticEvent) {
    e.preventDefault();

    if (currentUser && userInfo) {
      try {
        await messageCollection.add({
          uid: currentUser.uid,
          email: userInfo.email,
          fullname: userInfo.fullname,
          description: userInfo.description,
          profileImg:
            userInfo.profileImg ||
            'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          text: textAreaValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          chatroom: selectedRoom,
        });
        setTextAreaValue('');
        handleClick();
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
          value={textAreaValue}
          onInput={e => setTextAreaValue(e.target.value)}
        />

        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatRoomForm;
