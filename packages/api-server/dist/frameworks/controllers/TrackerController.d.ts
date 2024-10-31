import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import ITrackerUseCase from "@domains/useCases/interfaces/ITrackerUseCase";
import ITrackerController from "./interfaces/ITrackerController";
export default class TrackerController implements ITrackerController {
    private readonly trackerUseCase;
    constructor(trackerUseCase: ITrackerUseCase);
    getDelivery(carrierId: string, trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
}
//# sourceMappingURL=TrackerController.d.ts.map