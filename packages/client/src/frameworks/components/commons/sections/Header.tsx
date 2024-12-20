import { css } from "@styled-system/css"

export default function Header() {
  return (
    <header
      className={css({
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
        height: 50,
        background: "#fff",
        "@media (prefers-color-scheme: dark)": {
          background: "rgb(55, 55, 55)",
          color: "#fff"
        }
      })}
    >
      <h1
        className={css({
          fontSize: 16,
          fontWeight: "normal"
        })}
      >
        택배 배송 조회
      </h1>
    </header>
  )
}
