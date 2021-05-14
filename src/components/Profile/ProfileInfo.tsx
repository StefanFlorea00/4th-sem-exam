import React, { useState, useEffect, useContext } from 'react';
import './ProfileInfo.scss';
import { AuthContext } from '../../Auth';
import app from '../FirebaseApp';
import { uploadUserImage, getDoc } from '../FirebaseApp';


function ProfileInfo() {
  const { currentUser } = useContext(AuthContext);
  const [profileInfo, useProfileInfo] = useState<any>();
  const [file, setFile] = useState<any>();
  const [url, setURL] = useState("");

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      useProfileInfo(data);
    });
  }, []);

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

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
    <div className=''>
      <div>
        <img src={profileInfo?.profileImg ? profileInfo.profileImg : url} alt="User profile image" />
        <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
