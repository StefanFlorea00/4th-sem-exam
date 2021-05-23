import React, { useState } from 'react';

type Props = {
  selectedRoom: string;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
};
function Rooms(props: Props) {
  function handleClick(e: any) {
    props.setSelectedRoom(e.target.textContent.toLowerCase());
  }
  return (
    <div className='rooms'>
      <button
        className={props.selectedRoom === 'general' ? 'btn_selected' : ''}
        onClick={handleClick}
      >
        General
      </button>
      <button
        className={props.selectedRoom === 'questions' ? 'btn_selected' : ''}
        onClick={handleClick}
      >
        Questions
      </button>
      <button
        className={props.selectedRoom === 'investment' ? 'btn_selected' : ''}
        onClick={handleClick}
      >
        Investment
      </button>
      <button
        className={props.selectedRoom === 'trading' ? 'btn_selected' : ''}
        onClick={handleClick}
      >
        Trading
      </button>
      <button
        className={props.selectedRoom === 'environment' ? 'btn_selected' : ''}
        onClick={handleClick}
      >
        Environment
      </button>
    </div>
  );
}

export default Rooms;
