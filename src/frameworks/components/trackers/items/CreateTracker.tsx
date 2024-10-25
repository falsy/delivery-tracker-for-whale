import { css } from "@emotion/react"
import useDependencies from "../../../hooks/useDependencies"
import { useErrorMessage } from "../../../hooks/zustands/useErrorMessage"
import useTrackerList from "../../../hooks/useTrackerList"
import Button from "../../commons/items/Button"

export default function CreateTracker() {
  const { controllers } = useDependencies()
  const { setErrMessage } = useErrorMessage()
  const { getTrackerList } = useTrackerList()

  const createTracker = async () => {
    const { isError } = await controllers.tracker.addTracker()
    if (isError) {
      setErrMessage()
      return
    }
    getTrackerList()
  }

  return (
    <div
      css={css`
        padding: 0 20px 40px;
      `}
    >
      <Button text={"추가"} handleClick={createTracker} />
    </div>
  )
}
