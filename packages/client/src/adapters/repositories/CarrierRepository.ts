import { API_URL, CARRIER_LIST } from "@constants/index"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import LayerDTO from "@adapters/dtos/LayerDTO"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import ICacheWebStorage from "@adapters/infrastructures/interfaces/ICacheWebStorage"
import IETagManager from "@services/interfaces/IETagManager"
import CarrierDTO from "@adapters/dtos/CarrierDTO"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"

export default class CarrierRepository implements ICarrierRepository {
  private readonly clientHTTP: IClientHTTP
  private readonly etagManager: IETagManager
  private readonly cacheWebStorage: ICacheWebStorage

  constructor(
    clientHTTP: IClientHTTP,
    cacheWebStorage: ICacheWebStorage,
    etagManager: IETagManager
  ) {
    this.clientHTTP = clientHTTP
    this.cacheWebStorage = cacheWebStorage
    this.etagManager = etagManager
  }

  getCachedCarriers(): ICarrierDTO[] {
    try {
      const carrierList = this.cacheWebStorage.getItem(CARRIER_LIST)
      const parseJSON = JSON.parse(carrierList)

      if (!Array.isArray(parseJSON)) return []

      const carriers = parseJSON.map((carrierDTO: ICarrierDTO) => {
        return new CarrierDTO({
          id: carrierDTO.id,
          no: carrierDTO.no,
          name: carrierDTO.name,
          displayName: carrierDTO.displayName,
          isCrawlable: carrierDTO.isCrawlable,
          isPopupEnabled: carrierDTO.isPopupEnabled,
          popupURL: carrierDTO.popupURL
        })
      })

      return carriers
    } catch {
      return []
    }
  }

  setCachedCarriers(carriers: ICarrierDTO[]): void {
    this.cacheWebStorage.setItem(CARRIER_LIST, JSON.stringify(carriers))
  }

  async getCarriers(): Promise<ILayerDTO<CarrierDTO[]>> {
    try {
      const url = `${API_URL}/carriers`
      const etag = this.etagManager.getETag(url)
        ? { "If-None-Match": this.etagManager.getETag(url) }
        : null
      const res = await this.clientHTTP.get(
        url,
        etag === null ? null : { headers: { ...etag } }
      )

      if (res.status === 304) {
        return new LayerDTO({
          data: this.etagManager.getData(url) as CarrierDTO[]
        })
      }

      const { isError, message, data } = await res.json()

      if (!res.ok || isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const carriers = data.map((carrierDTO: ICarrierDTO) => {
        return new CarrierDTO({
          id: carrierDTO.id,
          no: carrierDTO.no,
          name: carrierDTO.name,
          displayName: carrierDTO.displayName,
          isCrawlable: carrierDTO.isCrawlable,
          isPopupEnabled: carrierDTO.isPopupEnabled,
          popupURL: carrierDTO.popupURL
        })
      })

      this.etagManager.setETagData(url, res.headers.get("ETag"), carriers)

      return new LayerDTO({
        data: carriers
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }
}
