import { css } from "@emotion/react"

export default function LabelBox({
  label,
  changeLabel
}: {
  label: string
  changeLabel: (label: string) => void
}) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <input
        css={css`
          flex-grow: 1;
          line-height: 20px;
          width: 100%;
          font-size: 13px;
          padding: 5px;
          border: 0;
          background: transparent;

          @media (prefers-color-scheme: dark) {
            color: #fff;
          }
        `}
        type="text"
        value={label}
        onChange={(e) => changeLabel(e.target.value)}
        placeholder="배송에 대한 간단한 메모를 적을 수 있어요."
      />
    </div>
  )
}
