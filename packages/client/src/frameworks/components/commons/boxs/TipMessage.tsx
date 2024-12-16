import { css } from "@emotion/react"

export default function TipMessage({
  resetTrackers
}: {
  resetTrackers: () => void
}) {
  return (
    <section
      css={css`
        padding: 0 20px;
        font-size: 12px;
        color: #444;

        @media (prefers-color-scheme: dark) {
          color: #ddd;
        }
      `}
    >
      <p
        css={css`
          line-height: 18px;
        `}
      >
        * 서비스가 정상 동작하지 않을 경우 아래의 <strong>[초기화]</strong>를
        진행해 주세요.
      </p>
      <p>
        <button
          id="reset-button"
          css={css`
            display: block;
            color: #05c38b;
            font-weight: bold;
            padding: 2px 0;
            font-size: 13px;
          `}
          onClick={resetTrackers}
        >
          [초기화]
        </button>
      </p>
    </section>
  )
}
