import { css } from "@emotion/react"
import useTrackers from "@hooks/useTrackers"
import TrackerBox from "../boxs/TrackerBox"

export default function TrackerSection() {
  const { trackers } = useTrackers()

  return (
    <div
      css={css`
        padding: 20px 20px 0;
      `}
    >
      {trackers.map((tracker) => {
        return <TrackerBox key={tracker.id} trackerId={tracker.id} />
      })}
    </div>
  )
}
