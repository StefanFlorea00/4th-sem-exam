import React from 'react';
import './UserButton.scss';

function UserButton(props: any) {
  return (
  <div className="user-btn">
      <img className="user-img" src={props.userImg}/>
      {props.hasInfo && <div className="info">
      <h3>{props.userInfo.name}</h3>
      <p>{props.userInfo.desc}</p>
      </div>}
    </div>
  );
}

export default UserButton;
