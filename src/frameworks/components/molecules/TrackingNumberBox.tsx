import ICarrier from "@domains/entities/interfaces/ICarrier"
import TrackingNumberInput from "@components/atoms/TrackingNumberInput"
import WindowButton from "@components/atoms/WindowButton"
import SubmitButton from "@components/atoms/SubmitButton"

export default function TrackingNumberBox({
  carrier,
  trackingNumber,
  changeTrackingNumber,
  getDelivery
}: {
  carrier: ICarrier
  trackingNumber: string
  changeTrackingNumber: (trackingNumber: string) => void
  getDelivery: (carrier: ICarrier, trackerTrackingNumber: string) => void
}) {
  return (
    <div className="pb-2 flex">
      <TrackingNumberInput
        trackingNumber={trackingNumber}
        changeTrackingNumber={changeTrackingNumber}
      />
      {carrier.isPopupEnabled && (
        <WindowButton url={carrier.popupURL + trackingNumber} />
      )}
      {carrier.isCrawlable && (
        <SubmitButton
          handleClick={() => getDelivery(carrier, trackingNumber)}
        />
      )}
    </div>
  )
}
