import ITracker from "@domains/entities/interfaces/ITracker"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"

export default interface ITrackerController {
  getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  addTracker(): Promise<ILayerDTO<boolean>>
  getTrackers(): Promise<ILayerDTO<ITracker[]>>
  patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>>
  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>>
  clearTrackers(): Promise<ILayerDTO<boolean>>
}
