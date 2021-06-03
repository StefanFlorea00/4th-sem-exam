import React from 'react';
import Button from './Buttons/Button';
import './NotFound.scss';
import { useHistory } from "react-router-dom";

function NotFound() {

    const history = useHistory();
    document.title = `Community - 404`;

  function sendHome() {
    let path = "/";
    history.push(path);
  }


  return (
    <div className='not-found'>
     <h1>Sorry!</h1>
     <p>We could not find this page.</p>
     <Button onClick={sendHome} type="secondary" text="Home"/>
    </div>
  );
}

export default NotFound;
