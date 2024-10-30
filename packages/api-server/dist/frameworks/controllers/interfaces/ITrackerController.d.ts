import IDeliveryDTO from "../../../domains/dtos/interfaces/IDeliveryDTO";
import ILayerDTO from "../../../domains/dtos/interfaces/ILayerDTO";
export default interface ITrackerController {
    getDelivery(carrierId: string, trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
}
//# sourceMappingURL=ITrackerController.d.ts.map