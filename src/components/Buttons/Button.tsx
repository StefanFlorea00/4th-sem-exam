import React from 'react';
import './Button.scss';

function Button(props: any) {
  return (
  <button className={props.type + '-btn'}>
    {props.img && props.imgPos=="left" ? props.img : null}
    {props.text}
    {props.img && props.imgPos=="right" ? props.img : null}
  </button>
  );
}

export default Button;
