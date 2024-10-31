import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ITrackerUseCase from "@domains/useCases/interfaces/ITrackerUseCase"
import ITrackerController from "./interfaces/ITrackerController"
import ITracker from "@domains/entities/interfaces/ITracker"

export default class TrackerController implements ITrackerController {
  constructor(private readonly trackerUseCase: ITrackerUseCase) {}

  getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    return this.trackerUseCase.getDelivery(carrierId, trackingNumber)
  }

  addTracker(): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.addTracker()
  }

  getTrackers(): Promise<ILayerDTO<ITracker[]>> {
    return this.trackerUseCase.getTrackers()
  }

  patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.patchTracker(id, trackerProps)
  }

  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.deleteTracker(trackerId)
  }

  clearTrackers(): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.clearTrackers()
  }
}
