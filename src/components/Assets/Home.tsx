import React from 'react';
export type Props = {
  className?: string;
};
function Home(props: Props) {
  return (
    <svg
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 71.66 51.97'
      className={`nav_svg ${props.className}`}
    >
      <path
        d='M46.89,41.2a3.39,3.39,0,0,1,3.39-3.39h.55a3.39,3.39,0,0,1,3.39,3.39v8.4H66.34L49.92,11.7,33.51,49.6H46.89Z'
        fill='#1a1a1a'
        className={props.className}
      />
      <path
        d='M50.89,2.15H23.11Q11.56,26,0,49.93H71.33Q61.11,26,50.89,2.15ZM24,9H43v1.11H24Zm-4.23,8.81H38.81V18.9h-19ZM16.17,26.6H35.23v1.11H16.17Zm-4.33,8.82H30.9v1.11H11.84ZM27.1,45.28h-19V44.17H27.1ZM49.92,5,69.22,49.6H30.63Z'
        fill='#1a1a1a'
        className={props.className}
      />
    </svg>
  );
}

export default Home;
