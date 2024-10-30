import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierController from "./interfaces/ICarrierController"

export default class CarriersController implements ICarrierController {
  constructor(private readonly carriersUseCase: ICarrierUseCase) {}

  async getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>> {
    return await this.carriersUseCase.getCarriers()
  }
}
