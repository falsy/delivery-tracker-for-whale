import { css } from "@emotion/react"

export default function Footer() {
  return (
    <footer
      css={css`
        color: #aaa;
        font-size: 12px;
        font-weight: 500;
        position: sticky;
        top: 100%;
        padding: 15px 0 15px 20px;
      `}
    >
      &copy;{" "}
      <a href="https://falsy.me" target="_blank" rel="noreferrer">
        Falsy
      </a>
    </footer>
  )
}
