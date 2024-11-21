import { css } from "@emotion/react"
import CloseIcon from "@components/icons/CloseIcon"

export default function DeleteButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      aria-label="delete-button"
      className="delete-button"
      css={css`
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 18px;
          height: 18px;
          stroke: #fff;
        }
      `}
      onClick={handleClick}
    >
      <CloseIcon />
    </button>
  )
}
