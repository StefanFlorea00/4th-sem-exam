import React from 'react';

type Props = {
  id?: string;
  onClick?: (e: any) => void;
  type: 'primary' | 'secondary';
  img?: React.ReactNode | JSX.Element;
  imgPos?: 'left' | 'right';
  text: string;
};
function Button(props: Props) {
  return (
    <button
      data-id={props.id}
      onClick={props.onClick}
      className={props.type + '-btn'}
    >
      {props.img && props.imgPos == 'left' ? props.img : null}
      {props.text}
      {props.img && props.imgPos == 'right' ? props.img : null}
    </button>
  );
}

export default Button;
