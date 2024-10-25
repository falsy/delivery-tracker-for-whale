import useDependencies from "../../../hooks/useDependencies"
import useTrackerList from "../../../hooks/useTrackerList"
import { css } from "@emotion/react"

export default function TipMessage() {
  const { controllers } = useDependencies()
  const { getTrackerList } = useTrackerList()

  const handleClickReset = async () => {
    if (
      window.confirm(
        "초기화하면 기존에 저장된 모든 운송장 번호가 삭제됩니다.\n미리 다른곳에 메모해 주세요."
      )
    ) {
      const { isError: isClearError } =
        await controllers.tracker.clearTrackers()
      if (isClearError) return
      const { isError: isAddError } = await controllers.tracker.addTracker()
      if (isAddError) return
      getTrackerList()
    }
  }

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
          css={css`
            display: block;
            color: #05c38b;
            font-weight: bold;
            padding: 2px 0;
            font-size: 13px;
          `}
          onClick={handleClickReset}
        >
          [초기화]
        </button>
      </p>
    </section>
  )
}
