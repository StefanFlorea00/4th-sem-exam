import React from 'react';
import UserButton from '../Buttons/UserButton';
import Button from '../Buttons/Button';
import './Post.scss';
import PostWhoSaw from './PostWhoSaw';
import testimg from '../Assets/testimg.jpg';

function Post(props: any) {
  return (
    <div className="post">
        <UserButton hasInfo userInfo={{name:"Jane Doe", desc:"Super Cool Chick"}}/>
        {props.img && <img className="post-img" src={testimg} alt="Post image"/>}
        <p className="post-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aut tempora est minus nostrum ea consequuntur. Officiis perferendis quis sint, iusto ex alias saepe eveniet harum, unde quidem quam laudantium.</p>
        <div className="bottom-div">
        <Button type="primary" imgPos="left" img="commentImg" text="Add a comment"/>
        <PostWhoSaw/>
        </div>
    </div>
  );
}

export default Post;
