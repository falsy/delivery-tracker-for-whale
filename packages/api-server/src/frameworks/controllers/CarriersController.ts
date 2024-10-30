import { Controller, Get, Inject, Param } from "@nestjs/common"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase"
import ICarrierController from "./interfaces/ICarrierController"

@Controller("")
export default class CarriersController implements ICarrierController {
  constructor(
    @Inject("ICarrierUseCase")
    private readonly carriersUseCase: ICarrierUseCase
  ) {}

  @Get("carriers")
  getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>> {
    return this.carriersUseCase.getCarriers()
  }

  @Get("carrier/:carrierId")
  getCarrier(
    @Param("carrierId") carrierId: string
  ): Promise<ILayerDTO<ICarrierDTO>> {
    return this.carriersUseCase.getCarrier(carrierId)
  }
}
