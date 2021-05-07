import React from 'react';
import './Button.scss';

function Button(props: any) {
  return (
  <button className={props.type + '-btn'}>
    {props.img && props.imgPos=="left" && <img className="btn-img" src={props.img}/>}
    {props.text}
    {props.img && props.imgPos=="right" && <img className="btn-img" src={props.img}/>}
    </button>
  );
}

export default Button;
