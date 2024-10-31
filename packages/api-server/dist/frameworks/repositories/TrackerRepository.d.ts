import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import ICarrier from "@domains/entities/interfaces/ICarrier";
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP";
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository";
export default class TrackerRepository implements ITrackerRepository {
    protected readonly serverHTTP: IServerHTTP;
    constructor(serverHTTP: IServerHTTP);
    getDelivery(carrier: ICarrier, trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
}
//# sourceMappingURL=TrackerRepository.d.ts.map