import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ITrackerDTO, {
  ITrackerProps
} from "@domains/dtos/interfaces/ITrackerDTO"

export default interface ITrackerRepository {
  getDelivery(
    carrier: ICarrierDTO,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  getTrackers(): Promise<ILayerDTO<ITrackerDTO[]>>
  createTracker(tracker: ITrackerDTO): Promise<ILayerDTO<boolean>>
  patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>>
  updateTracker(tracker: ITrackerDTO): Promise<ILayerDTO<boolean>>
  deleteTracker(id: string): Promise<ILayerDTO<boolean>>
  clearTrackers(): Promise<ILayerDTO<boolean>>
}
