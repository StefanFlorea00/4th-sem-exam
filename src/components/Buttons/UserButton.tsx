import React from 'react';

function UserButton(props: any) {
  return (
    <div className={`user-btn ${props.className}`}>
      <img
        className='user-img'
        src={
          props.userImg
            ? props.userImg
            : 'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
        alt='profile image'
      />
      {props.hasInfo && (
        <div className='info'>
          <h3>{props.userInfo.name}</h3>
          <p>{props.userInfo.exp}</p>
        </div>
      )}
    </div>
  );
}

export default UserButton;
