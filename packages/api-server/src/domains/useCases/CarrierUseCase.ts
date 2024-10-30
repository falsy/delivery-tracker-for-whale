import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import ICarrierUseCase from "./interfaces/ICarrierUseCase"

export default class CarrierUseCase implements ICarrierUseCase {
  private carrierRepository: ICarrierRepository

  constructor(carrierRepository: ICarrierRepository) {
    this.carrierRepository = carrierRepository
  }

  getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>> {
    return this.carrierRepository.getCarriers()
  }

  getCarrier(carrierId: string): Promise<ILayerDTO<ICarrierDTO>> {
    return this.carrierRepository.getCarrier(carrierId)
  }
}
