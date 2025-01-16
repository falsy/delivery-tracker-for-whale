import { css } from "@styled-system/css"
import useTrackers from "@hooks/useTrackers"
import TrackerBox from "@containers/trackers/boxs/TrackerBox"
import Button from "@components/commons/items/Button"

export default function TrackerSection() {
  const { trackers, createTracker, deleteTracker } = useTrackers()

  const handleClickCreateTracker = async () => {
    createTracker()
  }

  const handleClickDeleteTracker = async (id: string) => {
    deleteTracker(id)
  }

  return (
    <section>
      <div
        className={css({
          padding: "20px 20px 0"
        })}
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
        className={css({
          padding: "0 20px 40px"
        })}
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
