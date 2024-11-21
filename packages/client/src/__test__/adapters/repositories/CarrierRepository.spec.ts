import { API_URL } from "@constants/index"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import LayerDTO from "@adapters/dtos/LayerDTO"
import CarrierRepository from "@adapters/repositories/CarrierRepository"
import IETagManager from "@services/interfaces/IETagManager"

describe("CarrierRepository", () => {
  let mockClientHTTP: jest.Mocked<IClientHTTP>
  let mockETagManager: jest.Mocked<IETagManager>
  let carrierRepository: CarrierRepository

  beforeEach(() => {
    mockClientHTTP = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    } as jest.Mocked<IClientHTTP>
    mockETagManager = {
      getETag: jest.fn(),
      getData: jest.fn(),
      setETagData: jest.fn()
    }
    carrierRepository = new CarrierRepository(mockClientHTTP, mockETagManager)
  })

  describe("getCarriers", () => {
    it("성공 시 carriers 데이터를 반환해야 한다", async () => {
      const mockData = [{ id: "1", name: "Carrier1" }]
      mockClientHTTP.get.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isError: false, data: mockData })
      } as Response)

      const result = await carrierRepository.getCarriers()

      expect(mockClientHTTP.get).toHaveBeenCalledWith(`${API_URL}/carriers`)
      expect(result).toEqual(new LayerDTO({ data: mockData }))
    })

    it("응답이 성공적이지 않을 때 에러 메시지를 반환해야 한다", async () => {
      mockClientHTTP.get.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ isError: true, message: "Server Error" })
      } as Response)

      const result = await carrierRepository.getCarriers()

      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Server Error" })
      )
    })

    it("예외가 발생할 때 에러 메시지를 반환해야 한다", async () => {
      mockClientHTTP.get.mockRejectedValueOnce(new Error("Network Error"))

      const result = await carrierRepository.getCarriers()

      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Network Error" })
      )
    })
  })

  describe("getCarrier", () => {
    it("성공 시 carrier 데이터를 반환해야 한다", async () => {
      const carrierId = "1"
      const mockData = { id: carrierId, name: "Carrier1" }
      mockClientHTTP.get.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isError: false, data: mockData })
      } as Response)

      const result = await carrierRepository.getCarrier(carrierId)

      expect(mockClientHTTP.get).toHaveBeenCalledWith(
        `${API_URL}/carrier/${carrierId}`
      )
      expect(result).toEqual(new LayerDTO({ data: mockData }))
    })

    it("응답이 성공적이지 않을 때 에러 메시지를 반환해야 한다", async () => {
      const carrierId = "1"
      mockClientHTTP.get.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ isError: true, message: "Server Error" })
      } as Response)

      const result = await carrierRepository.getCarrier(carrierId)

      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Server Error" })
      )
    })

    it("예외가 발생할 때 에러 메시지를 반환해야 한다", async () => {
      const carrierId = "1"
      mockClientHTTP.get.mockRejectedValueOnce(new Error("Network Error"))

      const result = await carrierRepository.getCarrier(carrierId)

      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Network Error" })
      )
    })
  })
})
