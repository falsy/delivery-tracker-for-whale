import { css } from "@styled-system/css"

export default function SubmitButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      aria-label="submit-button"
      className={css({
        border: "1px solid #05c38b",
        lineHeight: "40px",
        padding: 0,
        background: "#00dc9b",
        color: "#fff",
        width: "30%",
        minWidth: "60px",
        fontSize: 14,
        cursor: "pointer",
        textShadow: "0px 0px 1px #075c43",
        letterSpacing: "1px",
        fontWeight: 700,
        transition: "all 0.3s",
        _hover: {
          opacity: 0.8
        }
      })}
      onClick={handleClick}
    >
      조회
    </button>
  )
}
