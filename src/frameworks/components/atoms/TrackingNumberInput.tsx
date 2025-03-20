export default function TrackingNumberInput({
  trackingNumber,
  changeTrackingNumber
}: {
  trackingNumber: string
  changeTrackingNumber: (trackingNumber: string) => void
}) {
  return (
    <input
      className="flex-grow w-full text-base font-medium leading-[24px] px-3 placeholder:text-sm tracking-wide dark:text-white relative z-10 border border-border dark:border-border-dark"
      type="text"
      value={trackingNumber}
      onChange={(e) => changeTrackingNumber(e.target.value)}
      placeholder="운송장 번호를 입력해주세요."
    />
  )
}
