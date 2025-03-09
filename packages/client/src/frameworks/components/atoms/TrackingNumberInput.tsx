export default function TrackingNumberInput({
  trackingNumber,
  changeTrackingNumber
}: {
  trackingNumber: string
  changeTrackingNumber: (trackingNumber: string) => void
}) {
  return (
    <input
      className="flex-grow w-full text-base font-medium leading-[24px] px-3 border border-gray-300 border-r-0 placeholder:text-sm tracking-wide dark:bg-gray-700 dark:border-gray-600 dark:text-white relative z-10"
      type="text"
      value={trackingNumber}
      onChange={(e) => changeTrackingNumber(e.target.value)}
      placeholder="운송장 번호를 입력해주세요."
    />
  )
}
