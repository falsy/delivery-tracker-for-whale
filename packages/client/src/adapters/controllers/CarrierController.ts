import ICarrier from "@domains/entities/interfaces/ICarrier"
import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierController from "./interfaces/ICarrierController"

export default class CarriersController implements ICarrierController {
  constructor(private readonly carriersUseCase: ICarrierUseCase) {}

  async getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
    return await this.carriersUseCase.getCarriers()
  }
}
