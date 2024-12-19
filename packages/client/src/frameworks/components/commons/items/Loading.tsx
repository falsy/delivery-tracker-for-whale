import { css } from "@styled-system/css"

export default function Loading() {
  return (
    <div
      className={css({
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textIndent: -9999,
        fontSize: 0,
        _after: {
          content: '""',
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "3px solid rgba(255, 255, 255, 0)",
          borderRadius: "50%",
          borderTopColor: "#00dc9b",
          borderLeftColor: "#00dc9b",
          animation: "spin 0.85s ease-in-out infinite"
        }
      })}
    >
      loading...
    </div>
  )
}
