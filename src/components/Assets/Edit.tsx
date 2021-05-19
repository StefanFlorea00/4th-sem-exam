import React from "react"
export type Props = {
  className?: string
}

function Edit(props: Props) {
  return (
    <svg
      id="Layer_1"
      className={props.className}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 33.25"
    >
      <path d="M8,10.16Q8,7,8,3.83L2.42,10.12Z" fill="#1a1a1a" />
      <path
        d="M14.55,25,11,20.64,24.74,9.4l.82,1V9.23L25.38,9l.18-.12V6.24c-.08-.29-.65-2.56-2.25-2.94a2.26,2.26,0,0,0-.55-.06H9.87a.63.63,0,0,0-.15,0h0l-.59,0c0,2.68,0,5.35,0,8l-7.18-.06V28.77a3.79,3.79,0,0,0,.77,2.14,2.12,2.12,0,0,0,1.47.8H23.31c1.24,0,2.25-1.32,2.25-2.94V16.05ZM8.81,26.38A.28.28,0,0,1,8.5,26l1.75-4.63,3.44,4.21Z"
        fill="#1a1a1a"
      />
      <rect
        x="16.81"
        y="8.3"
        width="5.67"
        height="17.78"
        transform="translate(20.53 -8.9) rotate(50.76)"
        strokeWidth="0.5"
        stroke="#1a1a1a"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8.81,26.35l4.88-.8-3.44-4.21L8.5,26A.28.28,0,0,0,8.81,26.35Z"
        fill="none"
        stroke="#1a1a1a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      />
      <path
        d="M27,9.47h2a1.74,1.74,0,0,1,1.74,1.74v0a0,0,0,0,1,0,0H25.22a0,0,0,0,1,0,0v0A1.74,1.74,0,0,1,27,9.47Z"
        transform="translate(18.28 -17.84) rotate(50.76)"
        fill="none"
        stroke="#1a1a1a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      />
    </svg>
  )
}

export default Edit
