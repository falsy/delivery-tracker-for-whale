import { css, cx } from "@styled-system/css"
import CloseIcon from "@components/icons/CloseIcon"

export default function DeleteButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      aria-label="delete-button"
      className={cx(
        "delete-button",
        css({
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& > svg": {
            width: "18px",
            height: "18px",
            "@media (prefers-color-scheme: dark)": {
              stroke: "#fff"
            }
          }
        })
      )}
      onClick={handleClick}
    >
      <CloseIcon />
    </button>
  )
}
