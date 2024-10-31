import useDependencies from "./useDependencies"
import { useErrorMessage } from "./zustands/useErrorMessage"
import { useTrackerList } from "./zustands/useTrackerList"

export default function useTrackers() {
  const { controllers } = useDependencies()
  const { setErrMessage } = useErrorMessage()
  const { trackers, setTrackers } = useTrackerList()

  const getTrackers = async () => {
    const { isError, data } = await controllers.tracker.getTrackers()
    if (isError) {
      setErrMessage()
      return []
    }
    setTrackers(data)
  }

  return {
    trackers,
    setTrackers,
    getTrackers
  }
}
