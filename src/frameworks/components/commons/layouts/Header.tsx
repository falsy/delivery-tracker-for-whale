import { css } from "@emotion/react"

export default function Header() {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        padding: 0 20px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
        height: 50px;
        background: #fff;
        @media (prefers-color-scheme: dark) {
          background: rgb(55, 55, 55);
          color: #fff;
        }
      `}
    >
      <h1
        css={css`
          font-size: 16px;
          font-weight: normal;
        `}
      >
        택배 배송 조회
      </h1>
    </header>
  )
}
