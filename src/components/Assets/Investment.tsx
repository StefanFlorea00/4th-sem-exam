import React from 'react';
export type Props = {
  className?: string;
};

function Investment(props: Props) {
  return (
    <svg
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 26.58 21.71'
      className={`nav_svg ${props.className}`}
    >
      <path
        d='M3.2,13.85,9.85,8.07l6.38,4L21.54,5'
        fill='none'
        stroke='#1a1a1a'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={props.className}
      />
      className={props.className}
      <path d='M19.82,3.81,23,6.31,23.25,3Z' fill='#1a1a1a' />
      <rect
        x='2.96'
        y='15.41'
        width='1.39'
        height='3.25'
        rx='0.66'
        fill='none'
        stroke='#1a1a1a'
        strokeMiterlimit='10'
        strokeWidth='0.75'
        className={props.className}
      />
      <rect
        x='9.41'
        y='11.42'
        width='1.28'
        height='7.24'
        rx='0.61'
        fill='none'
        stroke='#1a1a1a'
        strokeMiterlimit='10'
        strokeWidth='0.75'
        className={props.className}
      />
      <rect
        x='15.71'
        y='13.89'
        width='1.44'
        height='4.77'
        rx='0.69'
        fill='none'
        stroke='#1a1a1a'
        strokeMiterlimit='10'
        strokeWidth='0.75'
        className={props.className}
      />
      <rect
        x='22.13'
        y='8.24'
        width='1.39'
        height='10.42'
        rx='0.66'
        fill='none'
        stroke='#1a1a1a'
        strokeMiterlimit='10'
        strokeWidth='0.75'
        className={props.className}
      />
    </svg>
  );
}

export default Investment;
