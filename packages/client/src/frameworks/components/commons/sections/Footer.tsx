import { css } from "@styled-system/css"

export default function Footer() {
  return (
    <footer
      className={css({
        color: "#aaa",
        fontSize: "12px",
        fontWeight: 500,
        position: "sticky",
        top: "100%",
        padding: "15px 0 15px 20px"
      })}
    >
      &copy;{" "}
      <a href="https://falsy.me" target="_blank" rel="noreferrer">
        Falsy
      </a>
    </footer>
  )
}
