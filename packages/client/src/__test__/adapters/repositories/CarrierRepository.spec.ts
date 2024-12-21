import { API_URL } from "@constants/index"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import LayerDTO from "@adapters/dtos/LayerDTO"
import CarrierRepository from "@adapters/repositories/CarrierRepository"
import IETagManager from "@services/interfaces/IETagManager"
import ICacheWebStorage from "@adapters/infrastructures/interfaces/ICacheWebStorage"

describe("CarrierRepository", () => {
  let mockClientHTTP: jest.Mocked<IClientHTTP>
  let mockETagManager: jest.Mocked<IETagManager>
  let mockCacheWebStorage: jest.Mocked<ICacheWebStorage>
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
    mockCacheWebStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    }
    carrierRepository = new CarrierRepository(
      mockClientHTTP,
      mockCacheWebStorage,
      mockETagManager
    )
  })

  describe("getCarriers", () => {
    it("성공 시 carriers 데이터를 반환해야 한다", async () => {
      const mockData = [{ id: "1", name: "Carrier1" }]
      mockClientHTTP.get.mockResolvedValueOnce({
        ok: true,
        headers: new Headers(),
        json: async () => ({ isError: false, data: mockData })
      } as Response)

      const result = await carrierRepository.getCarriers()

      expect(mockClientHTTP.get).toHaveBeenCalledWith(
        `${API_URL}/carriers`,
        null
      )
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
})
