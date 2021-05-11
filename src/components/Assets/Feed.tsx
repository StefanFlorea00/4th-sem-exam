import React from 'react';
export type Props = {
  className?: string;
};

function Feed(props: Props) {
  return (
    <svg
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 71.66 51.97'
      className={`nav_svg ${props.className}`}
    >
      <rect
        x='5.02'
        y='9.24'
        width='18.41'
        height='1.56'
        rx='0.69'
        fill='#1a1a1a'
        className={props.className}
      />
      <rect
        x='5.02'
        y='14.8'
        width='18.41'
        height='1.56'
        rx='0.69'
        fill='#1a1a1a'
        className={props.className}
      />
      <rect
        x='5.23'
        y='20.37'
        width='18.41'
        height='1.56'
        rx='0.69'
        fill='#1a1a1a'
        className={props.className}
      />
      <path
        className={props.className}
        d='M23.51,3.49A1.45,1.45,0,0,1,25,4.94v21a1.45,1.45,0,0,1-1.45,1.44H4.88a1.45,1.45,0,0,1-1.45-1.44v-21A1.45,1.45,0,0,1,4.88,3.49H23.51m0-1H4.88A2.45,2.45,0,0,0,2.43,4.94v21a2.45,2.45,0,0,0,2.45,2.44H23.51A2.45,2.45,0,0,0,26,25.94v-21a2.45,2.45,0,0,0-2.45-2.45Z'
        fill='#1a1a1a'
      />
    </svg>
  );
}

export default Feed;
