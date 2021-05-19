import React from 'react';
import './ShareBarInput.scss';
import Button from '../../Buttons/Button';
import AttachIcon from '../../Assets/AttachIcon';
import Send from '../../Assets/Send'

function ShareBarInput(props: any) {

  return (
    <div className="sharebar-input-div">
        <input type="text" className="share-input" placeholder="How's it going peeps?"/>
        <div className="attach-btn">
            <label htmlFor="attach"><AttachIcon/></label>
            <input type="file" id="attach" name="attach" accept="image/*" />
        </div>
        <Button type="primary" text="Send" imgPos="left" img={<Send className='btn-img'/>}/>
    </div>
  );
}

export default ShareBarInput;
