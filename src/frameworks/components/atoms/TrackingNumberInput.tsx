export default function TrackingNumberInput({
  trackingNumber,
  changeTrackingNumber
}: {
  trackingNumber: string
  changeTrackingNumber: (trackingNumber: string) => void
}) {
  return (
    <input
      className="flex-1 text-base font-[400] leading-[24px] px-5 placeholder:text-sm tracking-wide dark:text-white relative z-10 border border-border dark:border-border-dark rounded-4xl"
      type="text"
      value={trackingNumber}
      onChange={(e) => changeTrackingNumber(e.target.value)}
      placeholder="운송장 번호"
    />
  )
}
