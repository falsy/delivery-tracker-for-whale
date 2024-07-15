import ICarrierUseCase from "../../core/domains/usecases/interfaces/ICarrierUseCase"
import ICarrierDTO from "../../core/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ICarrierController from "./interfaces/ICarrierController"

export default class CarriersController implements ICarrierController {
  constructor(private readonly carriersUseCase: ICarrierUseCase) {}

  async getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>> {
    return await this.carriersUseCase.getCarriers()
  }
}
