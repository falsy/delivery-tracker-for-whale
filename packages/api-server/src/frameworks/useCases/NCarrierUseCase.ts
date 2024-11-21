import { Inject, Injectable } from "@nestjs/common"
import CarrierUseCase from "@domains/useCases/CarrierUseCase"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"

@Injectable()
export default class NCarrierUseCase extends CarrierUseCase {
  constructor(
    @Inject("ICarrierRepository") carrierRepository: ICarrierRepository
  ) {
    super(carrierRepository)
  }
}
