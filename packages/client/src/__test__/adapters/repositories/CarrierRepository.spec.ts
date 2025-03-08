import { describe, it, expect, beforeEach, vi } from "vitest"
import { API_URL } from "@constants/index"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import LayerDTO from "@adapters/dtos/LayerDTO"
import CarrierRepository from "@adapters/repositories/CarrierRepository"
import IETagManager from "@services/interfaces/IETagManager"
import ICacheWebStorage from "@adapters/infrastructures/interfaces/ICacheWebStorage"

describe("CarrierRepository", () => {
  let mockClientHTTP: IClientHTTP
  let mockETagManager: IETagManager
  let mockCacheWebStorage: ICacheWebStorage
  let carrierRepository: CarrierRepository

  beforeEach(() => {
    mockClientHTTP = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    }

    mockETagManager = {
      getETag: vi.fn(),
      getData: vi.fn(),
      setETagData: vi.fn()
    }

    mockCacheWebStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    }

    carrierRepository = new CarrierRepository(
      mockClientHTTP,
      mockCacheWebStorage,
      mockETagManager
    )
  })

  describe("getCarriers", () => {
    it("성공 시 carriers 데이터를 반환해야 한다", async () => {
      // Mock 데이터 설정
      const mockData = [{ id: "1", name: "Carrier1" }]
      vi.spyOn(mockClientHTTP, "get").mockResolvedValue({
        ok: true,
        headers: new Headers(),
        json: async () => ({ isError: false, data: mockData })
      } as Response)

      // 테스트 실행
      const result = await carrierRepository.getCarriers()

      // 검증
      expect(mockClientHTTP.get).toHaveBeenCalledWith(
        `${API_URL}/carriers`,
        null
      )
      expect(result).toEqual(new LayerDTO({ data: mockData }))
    })

    it("응답이 실패할 경우 에러 메시지를 반환해야 한다", async () => {
      // 실패하는 응답 설정
      vi.spyOn(mockClientHTTP, "get").mockResolvedValue({
        ok: false,
        json: async () => ({ isError: true, message: "Server Error" })
      } as Response)

      // 테스트 실행
      const result = await carrierRepository.getCarriers()

      // 검증
      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Server Error" })
      )
    })

    it("네트워크 예외가 발생할 경우 에러 메시지를 반환해야 한다", async () => {
      // 네트워크 에러 시뮬레이션
      vi.spyOn(mockClientHTTP, "get").mockRejectedValue(
        new Error("Network Error")
      )

      // 테스트 실행
      const result = await carrierRepository.getCarriers()

      // 검증
      expect(result).toEqual(
        new LayerDTO({ isError: true, message: "Network Error" })
      )
    })
  })
})
