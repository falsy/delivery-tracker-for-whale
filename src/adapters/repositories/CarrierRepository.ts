import { API_URL } from "../../constants"
import ICarrier from "../../core/domains/entities/interfaces/ICarrier"
import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ICarrierRepository from "../../core/repositories/interfaces/ICarrierRepository"
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
