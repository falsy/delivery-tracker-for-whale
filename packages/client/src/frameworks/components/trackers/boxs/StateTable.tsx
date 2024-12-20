import { css } from "@styled-system/css"

export default function StateTable({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <table
      className={css({
        tableLayout: "fixed",
        width: "100%",
        textAlign: "center",
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
        borderSpacing: 0,
        fontSize: "13px",
        "@media (prefers-color-scheme: dark)": {
          borderColor: "rgb(85, 85, 85)",
          color: "#fff"
        },
        "& th, & td": {
          borderLeft: "1px solid #ddd",
          borderTop: "1px solid #ddd",
          "@media (prefers-color-scheme: dark)": {
            borderColor: "rgb(85, 85, 85)"
          }
        },
        "& th": {
          background: "#f5f5f5",
          lineHeight: "34px",
          "&:first-of-type": {
            width: "35%"
          },
          "@media (prefers-color-scheme: dark)": {
            background: "rgb(44, 44, 44)"
          }
        },
        "& td": {
          lineHeight: "20px",
          padding: "5px",
          "& p": {
            margin: "5px 0"
          }
        }
      })}
    >
      {children}
    </table>
  )
}
