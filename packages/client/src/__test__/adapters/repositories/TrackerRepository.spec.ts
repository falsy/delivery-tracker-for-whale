import { API_URL, TRACKER_LIST } from "@constants/index"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ITracker from "@domains/entities/interfaces/ITracker"
import Tracker from "@domains/entities/Tracker"
import ITrackerDTO from "@domains/dtos/interfaces/ITrackerDTO"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import IBrowserStorage from "@adapters/infrastructures/interfaces/IBrowserStorage"
import LayerDTO from "@adapters/dtos/LayerDTO"
import TrackerDTO from "@adapters/dtos/TrackerDTO"
import TrackerRepository from "@adapters/repositories/TrackerRepository"
import carriers from "../../mocks/carrierMock"

describe("TrackerRepository", () => {
  let mockClientHTTP: jest.Mocked<IClientHTTP>
  let mockBrowserStorage: jest.Mocked<IBrowserStorage>
  let trackerRepository: TrackerRepository

  beforeEach(() => {
    mockClientHTTP = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    } as jest.Mocked<IClientHTTP>

    mockBrowserStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    } as jest.Mocked<IBrowserStorage>

    trackerRepository = new TrackerRepository(
      mockClientHTTP,
      mockBrowserStorage
    )
  })

  describe("getDelivery", () => {
    it("성공 시 배송 데이터를 반환해야 한다", async () => {
      const carrier: ICarrierDTO = carriers[0]
      const trackingNumber = "12345"
      const mockData = { status: "In Transit" }

      mockClientHTTP.get.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isError: false, data: mockData })
      } as Response)

      const result = await trackerRepository.getDelivery(
        carrier,
        trackingNumber
      )

      expect(mockClientHTTP.get).toHaveBeenCalledWith(
        `${API_URL}/tracker/${carrier.id}/12345`
      )
      expect(result).toEqual(new LayerDTO({ data: mockData }))
    })

    it("응답이 성공적이지 않을 때 에러 메시지를 반환해야 한다", async () => {
      const carrier: ICarrierDTO = carriers[0]
      const trackingNumber = "12345"

      mockClientHTTP.get.mockResolvedValueOnce({
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

      mockBrowserStorage.getItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: { [TRACKER_LIST]: mockTrackers }
      })

      const result = await trackerRepository.getTrackers()

      expect(mockBrowserStorage.getItem).toHaveBeenCalledWith(TRACKER_LIST)
      expect(result).toEqual(
        new LayerDTO({
          data: [new TrackerDTO(mockTrackerDTO)]
        })
      )
    })

    it("tracker 리스트가 비어 있을 때 빈 배열을 반환해야 한다", async () => {
      mockBrowserStorage.getItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: {}
      })

      const result = await trackerRepository.getTrackers()

      expect(result).toEqual(new LayerDTO({ data: [] }))
    })
  })

  describe("patchTracker", () => {
    it("tracker 업데이트가 성공하면 true를 반환해야 한다", async () => {
      const trackerId = "1"
      const trackerProps = { label: "Updated Label" }
      const mockData = [{ id: "1", label: "Old Label" }]

      mockBrowserStorage.getItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: { [TRACKER_LIST]: JSON.stringify(mockData) }
      })
      mockBrowserStorage.setItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: true
      })

      const result = await trackerRepository.patchTracker(
        trackerId,
        trackerProps
      )

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("addTracker", () => {
    it("tracker 추가가 성공하면 true를 반환해야 한다", async () => {
      const mockTrackerData: ITrackerDTO = new Tracker({ id: "1" })
      const tracker: ITracker = new Tracker({ id: "2" })

      mockBrowserStorage.getItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: { [TRACKER_LIST]: JSON.stringify([mockTrackerData]) }
      })
      mockBrowserStorage.setItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: true
      })

      const result = await trackerRepository.addTracker(tracker)

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("updateTracker", () => {
    it("tracker 수정이 성공하면 true를 반환해야 한다", async () => {
      const mockTrackerData: ITrackerDTO = new Tracker({
        id: "1",
        label: "Old Label"
      })
      const tracker: ITracker = new Tracker({ id: "1", label: "Updated Label" })

      mockBrowserStorage.getItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: { [TRACKER_LIST]: JSON.stringify([mockTrackerData]) }
      })
      mockBrowserStorage.setItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: true
      })

      const result = await trackerRepository.updateTracker(tracker)

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("deleteTracker", () => {
    it("tracker 삭제가 성공하면 true를 반환해야 한다", async () => {
      const mockTrackerData: ITrackerDTO = new Tracker({ id: "1" })

      mockBrowserStorage.getItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: { [TRACKER_LIST]: JSON.stringify([mockTrackerData]) }
      })
      mockBrowserStorage.setItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: true
      })

      const result = await trackerRepository.deleteTracker("1")

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })

  describe("clearTrackers", () => {
    it("tracker 리스트 삭제가 성공하면 true를 반환해야 한다", async () => {
      mockBrowserStorage.removeItem.mockResolvedValueOnce({
        isError: false,
        message: "",
        data: true
      })

      const result = await trackerRepository.clearTrackers()

      expect(result).toEqual(new LayerDTO({ data: true }))
    })
  })
})
