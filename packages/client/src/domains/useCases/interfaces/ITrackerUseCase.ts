import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import ITracker from "@domains/entities/interfaces/ITracker"

export default interface ITrackerUseCase {
  getDelivery(
    carrier: ICarrier,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  getTrackers(): Promise<ILayerDTO<ITracker[]>>
  clearTrackers(): Promise<ILayerDTO<boolean>>
  createTracker(): Promise<ILayerDTO<boolean>>
  patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>>
  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>>
}
