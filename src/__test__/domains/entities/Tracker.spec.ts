import { describe, it, expect } from "vitest"
import Tracker from "@domains/entities/Tracker"

describe("Tracker 클래스 테스트", () => {
  const trackerData = {
    id: "1",
    carrierId: "123",
    label: "Test Tracker",
    trackingNumber: "0123456789",
    memos: ["Memo1", "Memo2"]
  }

  it("생성자를 통해 Tracker 인스턴스가 올바르게 생성된다", () => {
    const tracker = new Tracker(trackerData)

    expect(tracker).toBeInstanceOf(Tracker)
    expect(tracker.id).toBe(trackerData.id)
    expect(tracker.carrierId).toBe(trackerData.carrierId)
    expect(tracker.label).toBe(trackerData.label)
    expect(tracker.trackingNumber).toBe(trackerData.trackingNumber)
    expect(tracker.memos).toEqual(trackerData.memos)
  })
})
