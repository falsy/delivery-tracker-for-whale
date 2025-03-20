import ICarrier from "@domains/entities/interfaces/ICarrier"
import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierController from "./interfaces/ICarrierController"

export default class CarriersController implements ICarrierController {
  constructor(private readonly carriersUseCase: ICarrierUseCase) {}

  getCachedCarriers(): ICarrier[] {
    return this.carriersUseCase.getCachedCarriers()
  }

  getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
    return this.carriersUseCase.getCarriers()
  }
}
