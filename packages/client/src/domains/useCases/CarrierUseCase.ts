import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import LayerDTO from "@adapters/dtos/LayerDTO"
import ICarrier from "../entities/interfaces/ICarrier"
import Carrier from "../entities/Carrier"
import ICarrierUseCase from "./interfaces/ICarrierUseCase"

export default class CarrierUseCase implements ICarrierUseCase {
  private carrierRepository: ICarrierRepository

  constructor(carrierRepository: ICarrierRepository) {
    this.carrierRepository = carrierRepository
  }

  async getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
    const { isError, message, data } =
      await this.carrierRepository.getCarriers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const carriers = data.map((carrierDTO: ICarrierDTO) => {
      return this.convertToEntity(carrierDTO)
    })

    return new LayerDTO({
      data: carriers
    })
  }

  async getCarrier(carrierId: string): Promise<ILayerDTO<ICarrier>> {
    const { isError, message, data } =
      await this.carrierRepository.getCarrier(carrierId)

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const carrier = this.convertToEntity(data)

    return new LayerDTO({
      data: carrier
    })
  }

  protected convertToEntity(carrierDTO: ICarrierDTO): ICarrier {
    return new Carrier({
      id: carrierDTO.id,
      no: carrierDTO.no,
      name: carrierDTO.name,
      displayName: carrierDTO.displayName,
      isCrawlable: carrierDTO.isCrawlable,
      isPopupEnabled: carrierDTO.isPopupEnabled,
      popupURL: carrierDTO.popupURL
    })
  }
}
