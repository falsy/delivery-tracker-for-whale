import { useState } from "react"
import { css } from "@emotion/react"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ITracker from "@domains/entities/interfaces/ITracker"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import useCarriers from "@hooks/useCarriers"
import LabelBox from "@components/trackers/boxs/LabelBox"
import DeleteButton from "@components/trackers/items/DeleteButton"
import CarrierSelectBox from "@containers/carriers/boxs/CarrierSelectBox"
import TrackerNumberBox from "@components/trackers/boxs/TrackerNumberBox"
import TrackerStateBox from "@components/trackers/boxs/TrackerStateBox"
import MemoBox from "@components/trackers/boxs/MemoBox"

export default function TrackerBox({ tracker }: { tracker: ITracker }) {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { carriers } = useCarriers()
  const { getTrackers } = useTrackers()

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

  const handlePatchTracker = async (trackerProps: ITrackerProps) => {
    const { isError } = await controllers.tracker.patchTracker(
      tracker.id,
      trackerProps
    )
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
  }

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
        <LabelBox label={tracker.label} patchTracker={handlePatchTracker} />
        <DeleteButton
          handleClick={() => handleClickDeleteTracker(tracker.id)}
        />
      </div>

      <CarrierSelectBox carrier={carrier} patchTracker={handlePatchTracker} />

      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={tracker.trackingNumber}
        patchTracker={handlePatchTracker}
        getDelivery={handleClickDelivery}
      />

      {(isLoading || deliveryState !== null || errDeliveryMessage !== "") && (
        <TrackerStateBox
          isLoading={isLoading}
          errDeliveryMessage={errDeliveryMessage}
          deliveryState={deliveryState}
          progresses={progresses}
          closeFnc={resetDeliveryState}
        />
      )}

      <MemoBox memos={tracker.memos} patchTracker={handlePatchTracker} />
    </div>
  )
}
