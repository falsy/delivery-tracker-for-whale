import { css } from "@emotion/react"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import NewWinodwButton from "../items/NewWinodwButton"
import SubmitButton from "../items/SubmitButton"

export default function TrackerNumberBox({
  carrier,
  trackingNumber,
  patchTracker,
  getDelivery
}: {
  carrier: ICarrierDTO
  trackingNumber: string
  patchTracker: ({ trackingNumber }) => void
  getDelivery: (carrierId: string, trackerTrackingNumber: string) => void
}) {
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
        onChange={(e) => patchTracker({ trackingNumber: e.target.value })}
        placeholder="운송장 번호를 입력해주세요."
      />
      {carrier.isPopupEnabled && (
        <NewWinodwButton carrier={carrier} trackingNumber={trackingNumber} />
      )}
      {carrier.isCrawlable && (
        <SubmitButton
          handleClick={() => getDelivery(carrier.id, trackingNumber)}
        />
      )}
    </div>
  )
}
