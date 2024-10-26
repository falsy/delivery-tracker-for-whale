import { css } from "@emotion/react"
import CloseIcon from "@components/icons/CloseIcon"

export default function DeleteButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      className="delete-button"
      css={css`
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        // transform: translate3d(5px, 0, 0);

        @media (prefers-color-scheme: dark) {
          background: rgb(160, 160, 160);
        }

        svg {
          width: 18px;
          height: 18px;
        }
      `}
      onClick={handleClick}
    >
      <CloseIcon />
    </button>
  )
}
