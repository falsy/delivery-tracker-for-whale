import ITrackerUseCase from "../../core/domains/usecases/interfaces/ITrackerUseCase"
import IDeliveryDTO from "../../core/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ITrackerController from "./interfaces/ITrackerController"
import ITrackerDTO from "../../core/dtos/interfaces/ITrackerDTO"

export default class TrackerController implements ITrackerController {
  constructor(private readonly trackerUseCase: ITrackerUseCase) {}

  async getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    return this.trackerUseCase.getDelivery(carrierId, trackingNumber)
  }

  async addTracker(): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.addTracker()
  }

  async getTrackers(): Promise<ILayerDTO<ITrackerDTO[]>> {
    return this.trackerUseCase.getTrackers()
  }

  async updateCarrierId(
    tracker: ITrackerDTO,
    newCarrierId: string
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.updateCarrierId(tracker, newCarrierId)
  }

  async updateLabel(
    tracker: ITrackerDTO,
    newLabel: string
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.updateLabel(tracker, newLabel)
  }

  async updateTrackingNumber(
    tracker: ITrackerDTO,
    newTrackingNumber: string
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.updateTrackingNumber(tracker, newTrackingNumber)
  }

  async addMemo(tracker: ITrackerDTO): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.addMemo(tracker)
  }

  async updateMemo(
    tracker: ITrackerDTO,
    index: number,
    newMemo: string
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.updateMemo(tracker, index, newMemo)
  }

  async deleteMemo(
    tracker: ITrackerDTO,
    index: number
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.deleteMemo(tracker, index)
  }

  async deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.deleteTracker(trackerId)
  }

  async clearTrackers(): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.clearTrackers()
  }
}
