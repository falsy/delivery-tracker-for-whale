import TrackerUseCase from "@domains/useCases/TrackerUseCase";
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository";
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository";
export default class NTrackerUseCase extends TrackerUseCase {
    constructor(trackerRepository: ITrackerRepository, carrierRepository: ICarrierRepository);
}
//# sourceMappingURL=NTrackerUseCase.d.ts.map