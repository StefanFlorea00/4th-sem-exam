import React from 'react';
import Button from '../../Buttons/Button';
import './ShareStock.scss';

function ShareStock(props: any) {

  return (
    <div className='share-stock'>
        <textarea className='share-stock-text' placeholder="Write text here..."/>
        <Button type='secondary' text="Share"/>
    </div>
  );
}

export default ShareStock;

