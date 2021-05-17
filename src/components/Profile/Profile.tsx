import React, {useState, useContext, useEffect} from 'react';
import './Profile.scss';
import EditProfileInfo from './EditProfileInfo'
import ProfileInfo from './ProfileInfo';
import { AuthContext } from '../../Auth';
import { getDoc } from '../FirebaseApp';
import app from '../FirebaseApp';

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileInformation, setProfileInformation] = useState<any>()

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setProfileInformation(data);
    });
  }, []);

  return (
    <>
    <div className='profile'>
      {editMode ? <button className='profile_edit-button' onClick={()=>setEditMode(false)}>View Profile</button> : 
        <button className='profile_edit-button' onClick={()=>setEditMode(true)}>Edit</button>
      }
      {editMode ? 
        <EditProfileInfo profileInfo={profileInformation} setEditMode={setEditMode}/>
        :
        <ProfileInfo profileInfo={profileInformation} setProfileInformation={setProfileInformation}/>
      }
    </div>
    </>
  );
}

export default Profile;
