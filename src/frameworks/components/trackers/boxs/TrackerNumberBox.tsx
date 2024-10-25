import { useState } from "react"
import { css } from "@emotion/react"
import ITrackerDTO from "../../../../core/dtos/interfaces/ITrackerDTO"
import ICarrierDTO from "../../../../core/dtos/interfaces/ICarrierDTO"
import useDependencies from "../../../hooks/useDependencies"
import { useErrorMessage } from "../../../hooks/zustands/useErrorMessage"
import NewWinodwButton from "../items/NewWinodwButton"
import SubmitButton from "../items/SubmitButton"

export default function TrackerNumberBox({
  carrier,
  tracker,
  getDelivery
}: {
  carrier: ICarrierDTO
  tracker: ITrackerDTO
  getDelivery: (carrierId: string, trackerTrackingNumber: string) => void
}) {
  const { controllers } = useDependencies()
  const { setErrMessage } = useErrorMessage()
  const [trackingNumber, setTrackingNumber] = useState(tracker.trackingNumber)

  const handleChangeTrackingNumber = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cacheNumber = trackingNumber
    const newNumber = e.target.value
    setTrackingNumber(newNumber)
    const { isError } = await controllers.tracker.updateTrackingNumber(
      tracker,
      newNumber
    )
    if (isError) {
      setErrMessage()
      setTrackingNumber(cacheNumber)
      return
    }
  }

  const handleClickDelever = async () => {
    getDelivery(tracker.carrierId, trackingNumber)
  }

  return (
    <div
      css={css`
        padding-bottom: 10px;
        display: flex;
      `}
    >
      <input
        css={css`
          flex-grow: 1;
          width: 100%;
          line-height: 24px;
          margin: 0;
          padding: 0 15px;
          border: 1px solid #ddd;
          border-right: 0;
          font-size: 15px;
          letter-spacing: 0.3px;

          &::placeholder {
            font-size: 13px;
          }

          @media (prefers-color-scheme: dark) {
            background: rgb(55, 55, 55);
            border-color: rgb(85, 85, 85);
            color: #fff;
          }
        `}
        type="text"
        value={trackingNumber}
        onChange={(e) => handleChangeTrackingNumber(e)}
        placeholder="운송장 번호를 입력해주세요."
      />
      {carrier.isPopupEnabled && (
        <NewWinodwButton carrier={carrier} trackingNumber={trackingNumber} />
      )}
      {carrier.isCrawlable && <SubmitButton handleClick={handleClickDelever} />}
    </div>
  )
}
