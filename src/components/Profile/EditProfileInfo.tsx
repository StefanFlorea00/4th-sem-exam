import React, { useState, useContext } from 'react';
import './EditProfileInfo.scss';
import app from '../FirebaseApp';
import { uploadUserImage, updateUser } from '../FirebaseApp';
import { AuthContext } from '../../Auth';

export type Props = {
  profileInfo: any;
  setEditMode: ((arg0: boolean) => void);
};

function ProfileInfo(props: Props) {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState<any>(undefined);
  const [url, setURL] = useState("");

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(e: any) {
    e.preventDefault();
    if(file === undefined) {
      uploadUserImage(app.auth().currentUser, props.profileInfo.profileImg);
    } else {
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

    const { fullname, investExp, description } =
      e.target.elements;

    try {
      await updateUser(app.auth().currentUser, {
        fullname: fullname.value ? fullname.value : props.profileInfo.fullname,
        investExp: investExp.value ? investExp.value : props.profileInfo.investExp,
        description: description.value ? description.value : props.profileInfo.description
      }).then(() => {
        props.setEditMode(false)
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='profile-info'>
      <div className='profile-info_user'>
        <img src={props.profileInfo?.profileImg ? props.profileInfo.profileImg : url} alt="User profile image" />
        <form onSubmit={handleUpload}>
          <input type="file" id='profile-info_user_image_input' onChange={handleChange} /><br/>
          <input type="fullname" id='profile-info_user_name_input' name="fullname" defaultValue={props.profileInfo?.fullname}/><br/>
          <input type="investExp" id='profile-info_user_exp_input' name="investExp" defaultValue={props.profileInfo?.investExp}/><br/>
          <input type="description" id='profile-info_user_exp_input' name="description" defaultValue={props.profileInfo?.description ? props.profileInfo?.description : ''}/><br/>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
