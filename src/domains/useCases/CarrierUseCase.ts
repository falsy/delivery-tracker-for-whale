import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import Carrier from "@domains/entities/Carrier"
import LayerDTO from "@adapters/dtos/LayerDTO"

export default class CarrierUseCase implements ICarrierUseCase {
  private carrierRepository: ICarrierRepository

  constructor(carrierRepository: ICarrierRepository) {
    this.carrierRepository = carrierRepository
  }

  getCachedCarriers(): ICarrier[] {
    const cachedCarriers = this.carrierRepository.getCachedCarriers()

    const carriers = cachedCarriers.map((carrierDTO: ICarrierDTO) => {
      return this.convertToEntity(carrierDTO)
    })

    return carriers
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

    this.carrierRepository.setCachedCarriers(data)

    const carriers = data.map((carrierDTO: ICarrierDTO) => {
      return this.convertToEntity(carrierDTO)
    })

    return new LayerDTO({
      data: carriers
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
