import { css } from "@styled-system/css"

export default function Footer() {
  return (
    <footer
      className={css({
        color: "#666",
        fontSize: "12px",
        fontWeight: 400,
        position: "sticky",
        top: "100%",
        padding: "15px 0 15px 20px",
        "@media (prefers-color-scheme: dark)": {
          color: "#999"
        }
      })}
    >
      &copy;{" "}
      <a href="https://falsy.me" target="_blank" rel="noreferrer">
        Falsy
      </a>
    </footer>
  )
}
