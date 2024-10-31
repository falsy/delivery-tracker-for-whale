import { API_URL } from "@constants/index"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import LayerDTO from "@adapters/dtos/LayerDTO"
import IClientHTTP from "../infrastructures/interfaces/IClientHTTP"

export default class CarrierRepository implements ICarrierRepository {
  private readonly clientHTTP: IClientHTTP

  constructor(clietHTTP: IClientHTTP) {
    this.clientHTTP = clietHTTP
  }

  async getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
    try {
      const res = await this.clientHTTP.get(`${API_URL}/carriers`)
      const { isError, message, data } = await res.json()
      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      } else {
        return new LayerDTO({
          data
        })
      }
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async getCarrier(carrierId: string): Promise<ILayerDTO<ICarrier>> {
    try {
      const res = await this.clientHTTP.get(`${API_URL}/carrier/${carrierId}`)
      const { isError, message, data } = await res.json()

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      } else {
        return new LayerDTO({
          data
        })
      }
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }
}
