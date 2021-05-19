import React from "react"
export type Props = {
  className?: string
}

function Send(props: Props) {
  return (
    <svg
      id="Layer_1"
      className={props.className}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41.54 33.33"
    >
      <path
        d="M3.79,2.06V15.39H21a1.14,1.14,0,0,1,0,2.28H3.79V31L39,16.53Z"
        fill="#1a1a1a"
      />
    </svg>
  )
}

export default Send
