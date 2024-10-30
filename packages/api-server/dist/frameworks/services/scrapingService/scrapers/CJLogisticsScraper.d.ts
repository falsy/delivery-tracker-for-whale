import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP";
import IScraper from "./interfaces/IScraper";
export default class CJLogisticsScraper implements IScraper {
    private readonly serverHTTP;
    constructor(serverHTTP: IServerHTTP);
    getTrack(trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
    private parseLocationName;
    private parseStatus;
}
//# sourceMappingURL=CJLogisticsScraper.d.ts.map