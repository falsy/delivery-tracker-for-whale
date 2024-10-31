import ITracker from "./interfaces/ITracker"

export default class Tracker implements ITracker {
  readonly id: string
  carrierId: string
  label: string
  trackingNumber: string
  memos: string[]

  constructor(params: {
    id: string
    carrierId?: string
    label?: string
    trackingNumber?: string
    memos?: string[]
  }) {
    this.id = params.id
    this.carrierId = params?.carrierId ? params.carrierId : ""
    this.label = params?.label ? params?.label : ""
    this.trackingNumber = params?.trackingNumber ? params.trackingNumber : ""
    this.memos = params?.memos ? params.memos : []
  }
}
