import React from "react"
export type Props = {
  className?: string
}

function AvatarPlaceholder(props: Props) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288 292.68"
      className={props.className}
    >
      <circle cx="144" cy="97.24" r="72.87" fill="#999" />
      <path
        d="M144,168.11c-72.61,0-131.46,45.13-131.46,100.79H275.46C275.46,213.24,216.61,168.11,144,168.11Z"
        fill="#999"
      />
    </svg>
  )
}

export default AvatarPlaceholder
