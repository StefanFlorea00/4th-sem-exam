import React from 'react';

function Rooms(props) {
  function handleClick(e) {
    props.setSelectedRoom(e.target.textContent.toLowerCase());
  }
  return (
    <div className='rooms'>
      <button onClick={handleClick}>General</button>
      <button onClick={handleClick}>Questions</button>
      <button onClick={handleClick}>Investment</button>
      <button onClick={handleClick}>Trading</button>
      <button onClick={handleClick}>Environment</button>
    </div>
  );
}

export default Rooms;
