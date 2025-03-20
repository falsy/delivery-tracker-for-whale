import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ITracker from "@domains/entities/interfaces/ITracker"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ITrackerUseCase from "@domains/useCases/interfaces/ITrackerUseCase"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ITrackerController from "./interfaces/ITrackerController"

export default class TrackerController implements ITrackerController {
  constructor(private readonly trackerUseCase: ITrackerUseCase) {}

  getDelivery(
    carrier: ICarrier,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    return this.trackerUseCase.getDelivery(carrier, trackingNumber)
  }

  createTracker(): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.createTracker()
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
