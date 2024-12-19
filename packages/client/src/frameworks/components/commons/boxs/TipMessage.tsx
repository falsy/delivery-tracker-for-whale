import { css } from "@styled-system/css"

export default function TipMessage({
  resetTrackers
}: {
  resetTrackers: () => void
}) {
  return (
    <section
      className={css({
        padding: "0 20px",
        fontSize: 12,
        color: "#444",
        "@media (prefers-color-scheme: dark)": {
          color: "#ddd"
        }
      })}
    >
      <p
        className={css({
          lineHeight: "18px"
        })}
      >
        * 서비스가 정상 동작하지 않을 경우 아래의 <strong>[초기화]</strong>를
        진행해 주세요.
      </p>
      <p>
        <button
          id="reset-button"
          className={css({
            display: "block",
            color: "#05c38b",
            fontWeight: "bold",
            padding: "2px 0",
            fontSize: 13
          })}
          onClick={resetTrackers}
        >
          [초기화]
        </button>
      </p>
    </section>
  )
}
