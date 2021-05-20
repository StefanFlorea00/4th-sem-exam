import React, {useContext, useState} from 'react';
import './ShareBarInput.scss';
import Button from '../../Buttons/Button';
import AttachIcon from '../../Assets/AttachIcon';
import Send from '../../Assets/Send';
import app from '../../FirebaseApp';
import { createPost } from '../../FirebaseApp';
import { AuthContext } from '../../../Auth';

function ShareBarInput(props: any) {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState<any>(undefined);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(e: any) {
    e.preventDefault();
    
    if(file !== undefined) {
      const uploadTask = app.storage().ref(`/images/${file.name}`).put(file);
      await uploadTask.on("state_changed", console.log, console.error, () => {
      app.storage()
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(undefined);
          handlePostUpload(e, url)
        })
      });
    } else {
      handlePostUpload(e, '')
    }
  }

  async function handlePostUpload(e:any, url: string) {
    const { content } = e.target.elements;
    try {
      await createPost(app.auth().currentUser, {
        comments: [],
        media: url,
        content: content.value,
      }).then(() => {
        console.log('post done')
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="sharebar-input-div"onSubmit={handleUpload}>
        <input type="content" name='content' className="share-input" placeholder="How's it going peeps?"/>
        <div className={file !== undefined ? 'attach-btn attach-btn-green' : 'attach-btn'}>
            <label htmlFor="attach"><AttachIcon/></label>
            <input type="file" id="attach" name="attach" accept="image/*"  onChange={handleChange}/>
        </div>
        <Button type="primary" text="Send" imgPos="left" img={<Send className='btn-img'/>}/>
    </form>
  );
}

export default ShareBarInput;
