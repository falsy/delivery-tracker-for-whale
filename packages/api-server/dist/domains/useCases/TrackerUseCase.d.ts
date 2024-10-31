import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository";
import ITrackerUseCase from "./interfaces/ITrackerUseCase";
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO";
export default class TrackerUseCase implements ITrackerUseCase {
    private trackerRepository;
    private carrierRepository;
    constructor(trackerRepository: ITrackerRepository, carrierRepository: ICarrierRepository);
    getDelivery(carrierId: string, trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
}
//# sourceMappingURL=TrackerUseCase.d.ts.map