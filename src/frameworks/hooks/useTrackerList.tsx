import useDependencies from "./useDependencies"
import { useErrorMessage } from "./zustands/useErrorMessage"
import { useTrackers } from "./zustands/useTrackers"

export default function useTrackerList() {
  const { controllers } = useDependencies()
  const { setErrMessage } = useErrorMessage()
  const { trackers, setTrackers } = useTrackers()

  const getTrackerList = async () => {
    const { isError, data } = await controllers.tracker.getTrackers()
    if (isError) {
      setErrMessage()
      return []
    }
    setTrackers(data)
  }

  return {
    trackerList: trackers,
    getTrackerList
  }
}
