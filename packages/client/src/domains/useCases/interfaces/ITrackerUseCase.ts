import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ITracker from "@domains/entities/interfaces/ITracker"

export default interface ITrackerUseCase {
  getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  getTrackers(): Promise<ILayerDTO<ITracker[]>>
  clearTrackers(): Promise<ILayerDTO<boolean>>
  addTracker(): Promise<ILayerDTO<boolean>>
  patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>>
  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>>
}
