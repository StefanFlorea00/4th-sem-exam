import React from 'react';
import './FriendsList.scss';
import UserButton from './../Buttons/UserButton'

export type Props = {
  profileInfo: any;
};

function FriendsList(props: Props) {

  return (
    <div className='profile-friends'>
      <h2 className='profile-friends_header'>Friends</h2>
      <div className='profile-friends_list'>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
        <UserButton className='profile-friends_list_friend' hasInfo userInfo={{name:"Jane Doe", exp:"Super Cool Chick"}}/>
      </div>
    </div>
  );
}

export default FriendsList;
