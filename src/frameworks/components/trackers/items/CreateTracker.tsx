import { css } from "@emotion/react"
import useDependencies from "../../../hooks/useDependencies"
import useError from "../../../hooks/useError"
import useTrackers from "../../../hooks/useTrackers"
import Button from "../../commons/items/Button"

export default function CreateTracker() {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { getTrackers } = useTrackers()

  const createTracker = async () => {
    const { isError } = await controllers.tracker.addTracker()
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
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
