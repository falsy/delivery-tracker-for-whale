import ICarrierDTO from "../../dtos/interfaces/ICarrierDTO";
import IDeliveryDTO from "../../dtos/interfaces/IDeliveryDTO";
import ILayerDTO from "../../dtos/interfaces/ILayerDTO";
export default interface ITrackerRepository {
    getDelivery(carrier: ICarrierDTO, trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>;
}
//# sourceMappingURL=ITrackerRepository.d.ts.map