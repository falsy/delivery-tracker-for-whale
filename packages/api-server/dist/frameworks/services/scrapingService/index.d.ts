import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP";
export default class ScrapingService {
    static getTrack(serverHTTP: IServerHTTP, carrierName: string, trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
}
//# sourceMappingURL=index.d.ts.map