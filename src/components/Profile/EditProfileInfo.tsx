import React, { useState } from 'react';
import './EditProfileInfo.scss';
import app from '../FirebaseApp';
import { uploadUserImage } from '../FirebaseApp';


function ProfileInfo(props: any) {
  const [file, setFile] = useState<any>();
  const [url, setURL] = useState("");

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
    <div className='profile-info'>
      <div className='profile-info_image'>
        <img src={props.profileInfo?.profileImg ? props.profileInfo.profileImg : url} alt="User profile image" />
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} /><br/>
          <button disabled={!file}>upload to firebase</button>
        </form>
        {/* <form>
        <label>First name:</label><br/>
          <input type="text" id="fname" name="fname" value="John"/><br/>
          <label >Last name:</label><br/>
          <input type="text" id="lname" name="lname" value="Doe"/><br/><br/>
          <input type="submit" value="Submit"/>
        </form> */}
      </div>
    </div>
  );
}

export default ProfileInfo;
