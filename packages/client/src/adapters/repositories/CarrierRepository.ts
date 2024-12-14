import { API_URL } from "@constants/index"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import LayerDTO from "@adapters/dtos/LayerDTO"
import IETagManager from "@services/interfaces/IETagManager"
import IClientHTTP from "../infrastructures/interfaces/IClientHTTP"

export default class CarrierRepository implements ICarrierRepository {
  private readonly clientHTTP: IClientHTTP
  private readonly etagManager: IETagManager

  constructor(clietHTTP: IClientHTTP, etagManager: IETagManager) {
    this.clientHTTP = clietHTTP
    this.etagManager = etagManager
  }

  async getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
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
          data: this.etagManager.getData(url) as ICarrier[]
        })
      }

      const { isError, message, data } = await res.json()

      if (!res.ok || isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      this.etagManager.setETagData(url, res.headers.get("ETag"), data)

      return new LayerDTO({
        data
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async getCarrier(carrierId: string): Promise<ILayerDTO<ICarrier>> {
    try {
      const url = `${API_URL}/carrier/${carrierId}`
      const etag = this.etagManager.getETag(url)
        ? { "If-None-Match": this.etagManager.getETag(url) }
        : null
      const res = await this.clientHTTP.get(
        url,
        etag === null ? null : { headers: { ...etag } }
      )

      if (res.status === 304) {
        return new LayerDTO({
          data: this.etagManager.getData(url) as ICarrier
        })
      }

      const { isError, message, data } = await res.json()

      if (!res.ok || isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      this.etagManager.setETagData(url, res.headers.get("ETag"), data)

      return new LayerDTO({
        data
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }
}
