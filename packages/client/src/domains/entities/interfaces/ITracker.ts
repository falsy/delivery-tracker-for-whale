export default interface ITracker {
  readonly id: string
  carrierId: string
  label: string
  trackingNumber: string
  memos: string[]
}
