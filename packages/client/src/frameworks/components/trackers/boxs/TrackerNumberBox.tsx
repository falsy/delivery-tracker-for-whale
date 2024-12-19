import { css } from "@styled-system/css"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import NewWinodwButton from "../items/NewWinodwButton"
import SubmitButton from "../items/SubmitButton"

export default function TrackerNumberBox({
  carrier,
  trackingNumber,
  changeTrackingNumber,
  getDelivery
}: {
  carrier: ICarrier
  trackingNumber: string
  changeTrackingNumber: (trackingNumber) => void
  getDelivery: (carrierId: string, trackerTrackingNumber: string) => void
}) {
  return (
    <div
      className={css({
        paddingBottom: "10px",
        display: "flex"
      })}
    >
      <input
        className={css({
          flexGrow: 1,
          width: "100%",
          lineHeight: "24px",
          margin: 0,
          padding: "0 15px",
          border: "1px solid #ddd",
          borderRight: 0,
          fontSize: "15px",
          letterSpacing: 0.3,
          "&::placeholder": {
            fontSize: "13px"
          },
          "@media (prefers-color-scheme: dark)": {
            background: "rgb(55, 55, 55)",
            borderColor: "rgb(85, 85, 85)",
            color: "#fff"
          }
        })}
        type="text"
        value={trackingNumber}
        onChange={(e) => changeTrackingNumber(e.target.value)}
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
