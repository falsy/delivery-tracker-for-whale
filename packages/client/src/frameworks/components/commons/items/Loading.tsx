import { css, keyframes } from "@emotion/react"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export default function Loading() {
  return (
    <div
      css={css`
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        text-indent: -9999px;
        font-size: 0;
        &::after {
          content: "";
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0);
          border-radius: 50%;
          border-top-color: #00dc9b;
          border-left-color: #00dc9b;
          animation: ${spin} 0.85s ease-in-out infinite;
        }
      `}
    >
      loading...
    </div>
  )
}
