import { css } from "@emotion/react"

export default function Button({
  text,
  handleClick
}: {
  text: string
  handleClick(): void
}) {
  return (
    <button
      css={css`
        display: inline-block;
        width: 80px;
        font-size: 14px;
        line-height: 32px;
        color: #fff;
        background: #00dc9b;
        border: 1px solid #05c38b;
        text-shadow: 0px 0px 1px #075c43;
        letter-spacing: 1px;
        font-weight: 700;
        opacity: 1;
        transition: opacity 0.3s;
        &:hover {
          opacity: 0.8;
        }
      `}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}
