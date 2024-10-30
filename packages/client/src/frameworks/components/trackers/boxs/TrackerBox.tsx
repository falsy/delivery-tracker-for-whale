import { useState } from "react"
import { css } from "@emotion/react"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import useCarriers from "@hooks/useCarriers"
import DeleteButton from "../items/DeleteButton"
import LabelBox from "./LabelBox"
import CarrierSelectBox from "./CarrierSelectBox"
import TrackerNumberBox from "./TrackerNumberBox"
import MemoBox from "./MemoBox"
import TrackerState from "./TrackerStateBox"

export default function TrackerBox({ trackerId }: { trackerId: string }) {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { carriers } = useCarriers()
  const { trackers, getTrackers } = useTrackers()

  const [isLoading, setLoading] = useState(false)
  const [errDeliveryMessage, setDeliveryErrorMessage] = useState("")
  const [deliveryState, setDeliverState] = useState(null)
  const [progresses, setProgresses] = useState([])

  const handleClickDeleteTracker = async (id: string) => {
    if (!window.confirm("조회 정보를 삭제하시겠습니까?")) return
    const { isError } = await controllers.tracker.deleteTracker(id)
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
  }

  const resetDeliveryState = () => {
    setDeliveryErrorMessage("")
    setDeliverState(null)
    setProgresses([])
  }

  const handleClickDelivery = async (
    carrierId: string,
    trackingNumber: string
  ) => {
    if (trackingNumber === "") return

    setLoading(true)
    resetDeliveryState()

    const { isError, message, data } = await controllers.tracker.getDelivery(
      carrierId,
      trackingNumber
    )

    if (isError) {
      setLoading(false)
      setDeliveryErrorMessage(message)
      return
    }

    const { from, to, progresses, state } = data
    setDeliverState({
      from: from.name,
      to: to.name,
      state: state.name
    })
    setProgresses(progresses)
    setLoading(false)
  }

  const tracker = trackers.find((tracker) => tracker.id === trackerId)
  const carrier = tracker.carrierId
    ? carriers.find((carrier) => carrier.id === tracker.carrierId)
    : carriers[0]

  return (
    <div
      css={css`
        position: relative;
        padding: 10px 20px 0;
        margin-bottom: 20px;
        background: #fff;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

        @media (prefers-color-scheme: dark) {
          background: rgb(55, 55, 55);
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 30px;
          gap: 10px;
          padding: 5px 0 10px;
        `}
      >
        <LabelBox trackerId={trackerId} />
        <DeleteButton handleClick={() => handleClickDeleteTracker(trackerId)} />
      </div>

      <CarrierSelectBox carrier={carrier} trackerId={trackerId} />

      <TrackerNumberBox
        carrier={carrier}
        trackerId={trackerId}
        getDelivery={handleClickDelivery}
      />

      {(isLoading || deliveryState !== null || errDeliveryMessage !== "") && (
        <TrackerState
          isLoading={isLoading}
          errDeliveryMessage={errDeliveryMessage}
          deliveryState={deliveryState}
          progresses={progresses}
          closeFnc={resetDeliveryState}
        />
      )}

      <MemoBox trackerId={trackerId} />
    </div>
  )
}
