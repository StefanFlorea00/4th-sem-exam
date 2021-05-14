import React, { useState, useEffect, useContext } from 'react';
import './Profile.scss';
import { AuthContext } from '../../Auth';
import app from '../FirebaseApp';
import { uploadUserImage } from '../FirebaseApp';
import ProfileInfo from './ProfileInfo'


function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = app.storage().ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      app.storage()
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          uploadUserImage(app.auth().currentUser, url);
        });
    });
  }

  return (
    <div className='profile'>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
    </div>
  );
}

export default Profile;
