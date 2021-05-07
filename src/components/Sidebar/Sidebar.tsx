import React from 'react';
import './Sidebar.scss';
import Button from '../Buttons/Button';
import UserButton from '../Buttons/UserButton';

function Sidebar(props: any) {
  return (
    <div className="sidebar">
      <img className="logo" src="" alt="Logo"></img>
      <Button type="primary" text="Home" imgPos="left" img="a"/>
      <Button type="primary" text="Feed" imgPos="left" img="a"/>
      <Button type="primary" text="Investments" imgPos="left" img="a"/>
      <Button type="primary" text="Messages" imgPos="left" img="a"/>
      {// Userbutton info hardcode temporary
      }
      <UserButton hasInfo userInfo={{name:"Jane Doe", desc:"Super cool chick"}}/>
    </div>
    );
}

export default Sidebar;
