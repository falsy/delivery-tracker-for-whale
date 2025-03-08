import { describe, it, expect, beforeEach, vi } from "vitest"
import { API_URL, TRACKER_LIST } from "@constants/index"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import Tracker from "@domains/entities/Tracker"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import IBrowserStorage from "@adapters/infrastructures/interfaces/IBrowserStorage"
import LayerDTO from "@adapters/dtos/LayerDTO"
import TrackerDTO from "@adapters/dtos/TrackerDTO"
import TrackerRepository from "@adapters/repositories/TrackerRepository"
import carriers from "../../mocks/carrierMock"
import IETagManager from "@services/interfaces/IETagManager"

describe("TrackerRepository", () => {
  let mockClientHTTP: IClientHTTP
  let mockBrowserStorage: IBrowserStorage
  let mockETagManager: IETagManager
  let trackerRepository: TrackerRepository

  beforeEach(() => {
    vi.clearAllMocks()

    mockClientHTTP = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    }

    mockBrowserStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    }

    mockETagManager = {
      getETag: vi.fn(),
      getData: vi.fn(),
      setETagData: vi.fn()
    }

    trackerRepository = new TrackerRepository(
      mockClientHTTP,
      mockBrowserStorage,
      mockETagManager
    )
  })

  describe("getDelivery", () => {
    it("성공 시 배송 데이터를 반환해야 한다", async () => {
      const carrier: ICarrierDTO = carriers[0]
      const trackingNumber = "12345"
      const mockData = { status: "In Transit" }

      vi.spyOn(mockClientHTTP, "get").mockResolvedValue({
        ok: true,
        headers: new Headers(),
        json: async () => ({ isError: false, data: mockData })
      } as Response)

      const result = await trackerRepository.getDelivery(
        carrier,
        trackingNumber
      )

      expect(mockClientHTTP.get).toHaveBeenCalledWith(
        `${API_URL}/tracker/${carrier.id}/12345`,
        null
      )
      expect(result).toEqual(new LayerDTO({ data: mockData }))
    })

    it("응답이 실패하면 에러 메시지를 반환해야 한다", async () => {
      const carrier: ICarrierDTO = carriers[0]
      const trackingNumber = "12345"

      vi.spyOn(mockClientHTTP, "get").mockResolvedValue({
        ok: false,
        json: async () => ({ isError: true, message: "Server Error" })
      } as Response)

      const result = await trackerRepository.getDelivery(
        carrier,
        trackingNumber
      )

      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Server Error" })
      )
    })
  })

  describe("getTrackers", () => {
    it("성공 시 tracker 리스트를 반환해야 한다", async () => {
      const mockTracker = new Tracker({ id: "1" })
      const mockTrackerDTO = new TrackerDTO(mockTracker)
      const mockTrackers = JSON.stringify([mockTrackerDTO])

      vi.spyOn(mockBrowserStorage, "getItem").mockResolvedValue(
        new LayerDTO({ data: { [TRACKER_LIST]: mockTrackers } })
      )

      const result = await trackerRepository.getTrackers()

      expect(mockBrowserStorage.getItem).toHaveBeenCalledWith(TRACKER_LIST)
      expect(result).toEqual(
        new LayerDTO({ data: [new TrackerDTO(mockTrackerDTO)] })
      )
    })

    it("tracker 리스트가 비어 있을 때 빈 배열을 반환해야 한다", async () => {
      vi.spyOn(mockBrowserStorage, "getItem").mockResolvedValue(
        new LayerDTO({ data: {} })
      )

      const result = await trackerRepository.getTrackers()

      expect(result).toEqual(new LayerDTO({ data: [] }))
    })
  })

  describe("patchTracker", () => {
    it("tracker 업데이트가 성공하면 true를 반환해야 한다", async () => {
      const trackerId = "1"
      const trackerProps = { label: "Updated Label" }
      const mockData = [{ id: "1", label: "Old Label" }]

      vi.spyOn(mockBrowserStorage, "getItem").mockResolvedValue(
        new LayerDTO({ data: { [TRACKER_LIST]: JSON.stringify(mockData) } })
      )

      vi.spyOn(mockBrowserStorage, "setItem").mockResolvedValue(
        new LayerDTO({ data: true })
      )

      const result = await trackerRepository.patchTracker(
        trackerId,
        trackerProps
      )

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("addTracker", () => {
    it("tracker 추가가 성공하면 true를 반환해야 한다", async () => {
      const tracker = new Tracker({ id: "2" })

      vi.spyOn(mockBrowserStorage, "getItem").mockResolvedValue(
        new LayerDTO({ data: { [TRACKER_LIST]: JSON.stringify([]) } })
      )

      vi.spyOn(mockBrowserStorage, "setItem").mockResolvedValue(
        new LayerDTO({ data: true })
      )

      const result = await trackerRepository.createTracker(tracker)

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("deleteTracker", () => {
    it("tracker 삭제가 성공하면 true를 반환해야 한다", async () => {
      vi.spyOn(mockBrowserStorage, "getItem").mockResolvedValue(
        new LayerDTO({
          data: { [TRACKER_LIST]: JSON.stringify([{ id: "1" }]) }
        })
      )

      vi.spyOn(mockBrowserStorage, "setItem").mockResolvedValue(
        new LayerDTO({ data: true })
      )

      const result = await trackerRepository.deleteTracker("1")

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("clearTrackers", () => {
    it("tracker 리스트 삭제가 성공하면 true를 반환해야 한다", async () => {
      vi.spyOn(mockBrowserStorage, "removeItem").mockResolvedValue(
        new LayerDTO({ data: true })
      )

      const result = await trackerRepository.clearTrackers()

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })
})
