import React, { useState, useContext } from 'react';
import app from '../FirebaseApp';
import { uploadUserImage, updateUser } from '../FirebaseApp';
import { AuthContext } from '../../Auth';

export type Props = {
  profileInfo: {
    fullname: string;
    email: string;
    description: string;
    investExp: string;
    profileImg: string;
    createdAt: { seconds: number; nanoseconds: number };
  };
  setEditMode: (arg0: boolean) => void;
};

function ProfileInfo(props: Props) {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState<any>(undefined);
  const [url, setURL] = useState('');
  const [saving, setSaving] = useState<boolean | undefined>(undefined);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleImageUpload(e: any) {
    e.preventDefault();

    if (file === undefined) {
      if (props.profileInfo.profileImg) {
        uploadUserImage(app.auth().currentUser, props.profileInfo.profileImg);
      }
    } else {
      const uploadTask = app.storage().ref(`/avatars/${file.name}`).put(file);
      uploadTask.on('state_changed', console.log, console.error, () => {
        app
          .storage()
          .ref('avatars')
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setFile(null);
            setURL(url);
            uploadUserImage(app.auth().currentUser, url);
          });
      });
    }
  }

  async function handleUserUpload(e: any) {
    const { fullname, investExp, description } = e.target.elements;
    try {
      await updateUser(app.auth().currentUser, {
        fullname: fullname.value ? fullname.value : props.profileInfo.fullname,
        investExp: investExp.value
          ? investExp.value
          : props.profileInfo.investExp,
        description: description.value
          ? description.value
          : props.profileInfo.description,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAllDataUpload(e: any) {
    setSaving(true);
    handleImageUpload(e).then(() => {
      handleUserUpload(e);
    });
    setSaving(false);
  }

  return (
    <div className='profile-info'>
      <div className='profile-info_user'>
        <form onSubmit={handleAllDataUpload}>
          <div className='profile-info_user_flex'>
            <div className='profile-info_user_flex_image'>
              <img
                src={
                  url
                    ? url
                    : props.profileInfo.profileImg
                    ? props.profileInfo.profileImg
                    : 'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                alt='User profile image'
              />
              <div className='profile-info_user_flex_image_input'>
                <button>Change image</button>
                <input type='file' onChange={handleChange} />
              </div>
            </div>
            <div className='profile-info_user_flex_head'>
              <input
                type='fullname'
                className='profile-info_user_flex_head_fullname'
                name='fullname'
                defaultValue={props.profileInfo?.fullname}
              />
              <br />
              {/* <input type="investExp" className='profile-info_user_flex_head_exp' name="investExp" defaultValue={props.profileInfo?.investExp}/><br/> */}
              <select
                name='investExp'
                className='profile-info_user_flex_head_exp'
                defaultValue={props.profileInfo?.investExp}
              >
                <option value='Beginner investor'>Beginner</option>
                <option value='Intermediate investor'>intermediate</option>
                <option value='Expert investor'>Expert</option>
              </select>
            </div>
          </div>
          <textarea
            className='profile-info_user_desc'
            name='description'
            defaultValue={
              props.profileInfo?.description
                ? props.profileInfo?.description
                : 'Your description...'
            }
          />
          <br />
          <button
            className={
              saving === undefined
                ? 'profile-info_user_button'
                : saving === true
                ? 'profile-info_user_button profile-info_user_saving'
                : 'profile-info_user_button profile-info_user_saved'
            }
          >
            {saving === undefined
              ? 'Save'
              : saving === true
              ? 'Saving...'
              : 'Saved!'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
