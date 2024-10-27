import { css } from "@emotion/react"

export default function SubmitButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      aria-label="submit-button"
      css={css`
        border: 1px solid #05c38b;
        line-height: 40px;
        padding: 0;
        background: #00dc9b;
        color: #fff;
        width: 30%;
        min-width: 60px;
        font-size: 14px;
        cursor: pointer;
        text-shadow: 0px 0px 1px #075c43;
        letter-spacing: 1px;
        font-weight: 700;
        transition: all 0.3s;
        &:hover {
          opacity: 0.8;
        }
      `}
      onClick={handleClick}
    >
      조회
    </button>
  )
}
