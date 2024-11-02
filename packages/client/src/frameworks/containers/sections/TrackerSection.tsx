import { css } from "@emotion/react"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import ErrorMessage from "@containers/commons/boxs/ErrorMessage"
import TrackerBox from "@containers/trackers/boxs/TrackerBox"
import Button from "@components/commons/items/Button"

export default function TrackerSection() {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { trackers, getTrackers } = useTrackers()

  const handleClickCreateTracker = async () => {
    const { isError } = await controllers.tracker.addTracker()
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
  }

  return (
    <section>
      <ErrorMessage />
      <div
        css={css`
          padding: 20px 20px 0;
        `}
      >
        {trackers.map((tracker) => {
          return <TrackerBox key={tracker.id} tracker={tracker} />
        })}
      </div>
      <div
        css={css`
          padding: 0 20px 40px;
        `}
      >
        <Button text={"추가"} handleClick={handleClickCreateTracker} />
      </div>
    </section>
  )
}
