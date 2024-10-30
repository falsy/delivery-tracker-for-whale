import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ITrackerDTO from "@domains/dtos/interfaces/ITrackerDTO"

export default interface ITrackerRepository {
  getDelivery?(
    carrier: ICarrierDTO,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  getTrackers?(): Promise<ILayerDTO<ITrackerDTO[]>>
  addTracker?(tracker: ITrackerDTO): Promise<ILayerDTO<boolean>>
  updateTracker?(tracker: ITrackerDTO): Promise<ILayerDTO<boolean>>
  deleteTracker?(trackerId: string): Promise<ILayerDTO<boolean>>
  clearTrackers?(): Promise<ILayerDTO<boolean>>
}
