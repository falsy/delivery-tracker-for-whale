import { useEffect, useState } from "react"
import { css } from "@styled-system/css"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ITracker from "@domains/entities/interfaces/ITracker"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrackers"
import LabelBox from "@components/trackers/boxs/LabelBox"
import DeleteButton from "@components/trackers/items/DeleteButton"
import CarrierSelectBox from "@containers/carriers/boxs/CarrierSelectBox"
import TrackerNumberBox from "@components/trackers/boxs/TrackerNumberBox"
import TrackerStateBox from "@components/trackers/boxs/TrackerStateBox"
import MemoBox from "@components/trackers/boxs/MemoBox"

export default function TrackerBox({
  tracker,
  deleteTracker
}: {
  tracker: ITracker
  deleteTracker: (id: string) => void
}) {
  const { carriers } = useCarriers()
  const {
    isPending,
    delivery,
    patchTracker,
    deliveryErrorMessage,
    getDelivery,
    clearDelivery
  } = useTrackers()
  const initCarrierId = tracker.carrierId || carriers[0].id

  const [label, setLabel] = useState(tracker.label)
  const [trackingNumber, setTrackingNumber] = useState(tracker.trackingNumber)
  const [carrierId, setCarrierId] = useState(initCarrierId)
  const [memos, setMemos] = useState(tracker.memos)
  const [deliveryState, setDeliverState] = useState(null)
  const [progresses, setProgresses] = useState([])

  const carrier = carriers.find((c) => c.id === carrierId)

  useEffect(() => {
    if (!delivery) {
      setDeliverState(null)
      setProgresses([])
      return
    }

    const { from, to, progresses, state } = delivery
    setDeliverState({
      from: from.name,
      to: to.name,
      state: state.name
    })
    setProgresses(progresses)
  }, [delivery])

  const handleChangeLabel = (label: string) => {
    setLabel(label)
    autoSaveTracker({ label })
  }

  const handleChangeCarrierId = (carrierId: string) => {
    setCarrierId(carrierId)
    autoSaveTracker({ carrierId })
  }

  const handleChangeTrackingNumber = (trackingNumber: string) => {
    setTrackingNumber(trackingNumber)
    autoSaveTracker({ trackingNumber })
  }

  const handleChangeMemo = (memos: string[]) => {
    setMemos(memos)
    autoSaveTracker({ memos })
  }

  const autoSaveTracker = async (trackerProps: ITrackerProps) => {
    patchTracker(tracker.id, trackerProps)
  }

  const resetDeliveryState = () => {
    clearDelivery()
  }

  const handleClickDelivery = async (
    carrier: ICarrier,
    trackingNumber: string
  ) => {
    if (trackingNumber === "") return
    getDelivery(carrier, trackingNumber)
  }

  return (
    <div
      className={css({
        position: "relative",
        padding: "10px 20px 0",
        marginBottom: "20px",
        background: "#fff",
        boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
        "@media (prefers-color-scheme: dark)": {
          background: "rgb(55, 55, 55)"
        }
      })}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr 30px",
          gap: "10px",
          padding: "5px 0 10px"
        })}
      >
        <LabelBox label={label} changeLabel={handleChangeLabel} />
        <DeleteButton handleClick={() => deleteTracker(tracker.id)} />
      </div>

      <CarrierSelectBox
        carriers={carriers}
        carrier={carrier}
        changeCarrierId={handleChangeCarrierId}
      />

      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        changeTrackingNumber={handleChangeTrackingNumber}
        getDelivery={handleClickDelivery}
      />

      {(isPending || deliveryState !== null || deliveryErrorMessage !== "") && (
        <TrackerStateBox
          isPending={isPending}
          errDeliveryMessage={deliveryErrorMessage}
          deliveryState={deliveryState}
          progresses={progresses}
          closeFnc={resetDeliveryState}
        />
      )}

      <MemoBox memos={memos} changeMemo={handleChangeMemo} />
    </div>
  )
}
