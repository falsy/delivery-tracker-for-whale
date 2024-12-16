import { css } from "@emotion/react"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import ErrorMessage from "@containers/commons/boxs/ErrorMessage"
import TrackerBox from "@containers/trackers/boxs/TrackerBox"
import Button from "@components/commons/items/Button"
import ITracker from "@domains/entities/interfaces/ITracker"

export default function TrackerSection({
  trackers,
  getTrackers
}: {
  trackers: ITracker[]
  getTrackers: () => void
}) {
  const { controllers } = useDependencies()
  const { setMessage } = useError()

  const handleClickCreateTracker = async () => {
    const { isError } = await controllers.tracker.addTracker()
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
  }

  const handleClickDeleteTracker = async (id: string) => {
    if (!window.confirm("조회 정보를 삭제하시겠습니까?")) return
    const { isError } = await controllers.tracker.deleteTracker(id)
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
        {trackers.length > 0 && (
          <ul id="tracker-list">
            {trackers.map((tracker) => (
              <li key={tracker.id}>
                <TrackerBox
                  key={tracker.id}
                  tracker={tracker}
                  deleteTracker={handleClickDeleteTracker}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        css={css`
          padding: 0 20px 40px;
        `}
      >
        <Button
          id="create-tracker-button"
          text={"추가"}
          handleClick={handleClickCreateTracker}
        />
      </div>
    </section>
  )
}
