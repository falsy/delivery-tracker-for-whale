import { css } from "@emotion/react"
import useTrackerList from "../../../hooks/useTrackerList"
import TrackerBox from "../boxs/TrackerBox"

export default function TrackerSection() {
  const { trackerList } = useTrackerList()

  return (
    <div
      css={css`
        padding: 20px 20px 0;
      `}
    >
      {trackerList.map((tracker) => {
        return <TrackerBox key={tracker.id} tracker={tracker} />
      })}
    </div>
  )
}
