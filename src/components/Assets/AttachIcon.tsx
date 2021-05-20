import React from 'react';
export type Props = {
  className?: string;
};

function AttachIcon(props: Props) {
  return (
    <svg id="Layer_1" data-name="Layer 1" className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.59 33.57">
    <path d="M8.91,9.9c0,3.93-.07,7.85-.11,11.78a3,3,0,0,0,3,3.22,2.94,2.94,0,0,0,2.43-2.78v-14A6.36,6.36,0,0,0,9.44,4.68,6,6,0,0,0,3.62,8.12l.09,16.59a7,7,0,0,0,7.19,6.93,7,7,0,0,0,6.48-6.78l.18-13.44" fill="none" stroke="#1a1a1a" strokeMiterlimit="10"/>
    </svg>
  );
}

export default AttachIcon;
