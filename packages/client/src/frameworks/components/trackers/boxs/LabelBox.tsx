import { css } from "@styled-system/css"

export default function LabelBox({
  label,
  changeLabel
}: {
  label: string
  changeLabel: (label: string) => void
}) {
  return (
    <div
      className={css({
        display: "flex"
      })}
    >
      <input
        className={css({
          flex: 1,
          lineHeight: "20px",
          width: "100%",
          fontSize: "13px",
          padding: "5px",
          border: 0,
          background: "transparent",
          "@media (prefers-color-scheme: dark)": {
            color: "#fff"
          }
        })}
        type="text"
        value={label}
        onChange={(e) => changeLabel(e.target.value)}
        placeholder="배송에 대한 간단한 메모를 적을 수 있어요."
      />
    </div>
  )
}
