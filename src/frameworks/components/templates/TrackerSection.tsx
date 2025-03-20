import useTrackers from "@hooks/useTrackers"
import Tracker from "@components/organisms/Tracker"
import BasicButton from "@components/atoms/BasicButton"

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
      <div className="pt-5 px-5">
        {trackers.length > 0 && (
          <ul id="tracker-list">
            {trackers.map((tracker) => (
              <li key={tracker.id}>
                <Tracker
                  key={tracker.id}
                  tracker={tracker}
                  deleteTracker={handleClickDeleteTracker}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="pb-10 px-5">
        <BasicButton value="추가" onClick={handleClickCreateTracker} />
      </div>
    </section>
  )
}
