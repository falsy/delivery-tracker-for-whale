import { css } from "@styled-system/css"

export default function Button({
  text,
  handleClick,
  id
}: {
  text: string
  handleClick(): void
  id?: string
}) {
  return (
    <button
      id={id}
      className={css({
        display: "inline-block",
        width: "80px",
        fontSize: "14px",
        lineHeight: "32px",
        color: "#fff",
        background: "#00dc9b",
        border: "1px solid #05c38b",
        textShadow: "0px 0px 1px #075c43",
        letterSpacing: 1,
        fontWeight: 700,
        opacity: 1,
        transition: "opacity",
        transitionDuration: "0.3s",
        _hover: {
          opacity: 0.8
        }
      })}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}
