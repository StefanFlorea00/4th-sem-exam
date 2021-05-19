import React from "react"
export type Props = {
  className?: string
}

function View(props: Props) {
  return (
    <svg
      id="Layer_1"
      className={props.className}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42.67 40"
    >
      <path d="M21.15,7.12C8.77,7.19,1.21,15.53,0,16.91c.5.81,7.65,12,21.08,12.18,13.75.14,21.16-11.48,21.59-12.18C41.48,15.56,33.75,7,21.15,7.12Zm.18,18.35a7.37,7.37,0,1,1,7.38-7.37A7.37,7.37,0,0,1,21.33,25.47Z" />
    </svg>
  )
}

export default View
