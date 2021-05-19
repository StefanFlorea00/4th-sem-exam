import React from "react"
export type Props = {
  className?: string
}

function Signout(props: Props) {
  return (
    <svg
      id="Layer_1"
      className={props.className}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 37.09 38.59"
    >
      <path
        d="M24.67,13.7,24.78,8a5.29,5.29,0,0,0-1-3.22A4,4,0,0,0,22,3.35a3.38,3.38,0,0,0-1.23-.2c-1.38,0-7.44,0-15.73.14a3.18,3.18,0,0,0-1.61.27,3.33,3.33,0,0,0-1.59,1.7c-.14.31-.23.62-.24.64a3.34,3.34,0,0,0-.11.82c0,.65-.1,1.29-.1,1.93,0,1,0,10.34-.07,23.23a2.91,2.91,0,0,0,.84,1.87l.7.56a6.34,6.34,0,0,0,.57.32,6.69,6.69,0,0,0,1.25.49,6.89,6.89,0,0,0,1.49.29,148.06,148.06,0,0,0,15.22-.28A4.8,4.8,0,0,0,23,34.48a3.9,3.9,0,0,0,1.64-2.68l0-2.82c0-1.72,0-3.42,0-5.1"
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <line
        x1="7.03"
        y1="19.3"
        x2="28.75"
        y2="19.3"
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <polygon points="37.09 19.3 28.59 14.39 28.59 24.21 37.09 19.3" />
    </svg>
  )
}

export default Signout
