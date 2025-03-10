import DeleteButton from "@components/atoms/DeleteButton"
import LabelInput from "@components/atoms/LabelInput"
import CarrierListBox from "@components/molecules/CarrierListBox"
import MemoBox from "@components/molecules/MemoBox"
import StateBox from "@components/molecules/StateBox"
import TrackingNumberBox from "@components/molecules/TrackingNumberBox"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import ITracker from "@domains/entities/interfaces/ITracker"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrackers"
import { useEffect, useState } from "react"

export default function Tracker({
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
    <div className="relative mb-5 px-5 pt-2.5 pb-4 shadow-md bg-sectionBG dark:bg-sectionBG-dark">
      <div className="grid grid-cols-[1fr_30px] gap-2.5 py-1.5">
        <LabelInput label={label} changeLabel={handleChangeLabel} />
        <DeleteButton handleClick={() => deleteTracker(tracker.id)} />
      </div>
      <div className="pb-2">
        <CarrierListBox
          carrier={carrier}
          carriers={carriers}
          changeCarrierId={handleChangeCarrierId}
        />
      </div>
      <TrackingNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        changeTrackingNumber={handleChangeTrackingNumber}
        getDelivery={handleClickDelivery}
      />
      {(isPending || deliveryState !== null || deliveryErrorMessage !== "") && (
        <StateBox
          isPending={isPending}
          deliveryErrorMessage={deliveryErrorMessage}
          deliveryState={deliveryState}
          progresses={progresses}
          onClose={resetDeliveryState}
        />
      )}
      <MemoBox memos={memos} changeMemos={handleChangeMemo} />
    </div>
  )
}
