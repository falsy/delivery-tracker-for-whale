import { Inject, Injectable } from "@nestjs/common"
import TrackerUseCase from "@domains/useCases/TrackerUseCase"
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"

@Injectable()
export default class NTrackerUseCase extends TrackerUseCase {
  constructor(
    @Inject("ITrackerRepository") trackerRepository: ITrackerRepository,
    @Inject("ICarrierRepository") carrierRepository: ICarrierRepository
  ) {
    super(trackerRepository, carrierRepository)
  }
}
