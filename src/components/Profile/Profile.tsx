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
      {editMode ? '' : 
        <button onClick={()=>setEditMode(true)}>Edit</button>
      }
      {editMode ? 
        <EditProfileInfo profileInfo={profileInformation} setEditMode={setEditMode}/>
        :
        <ProfileInfo profileInfo={profileInformation}/>
      }
    </div>
    </>
  );
}

export default Profile;
