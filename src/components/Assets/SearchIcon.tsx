import React from 'react';
export type Props = {
  className?: string;
};

function SearchIcon(props: Props) {
  return (
    <svg id="Layer_1" data-name="Layer 1" className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.97 34.22">
    <circle cx="14.52" cy="15.29" r="11.48" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path d="M23.24,25H33.41a.86.86,0,0,1,.86.86V26a.86.86,0,0,1-.86.86H23.24a0,0,0,0,1,0,0V25a0,0,0,0,1,0,0Z" transform="matrix(0.78, 0.62, -0.62, 0.78, 22.31, -12.26)" fill="#1a1a1a"/>
    </svg>
  );
}

export default SearchIcon;
