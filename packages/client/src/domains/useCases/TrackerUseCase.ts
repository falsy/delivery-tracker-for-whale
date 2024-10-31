import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ITrackerDTO, {
  ITrackerProps
} from "@domains/dtos/interfaces/ITrackerDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository"
import LayerDTO from "@adapters/dtos/LayerDTO"
import ITracker from "../entities/interfaces/ITracker"
import Tracker from "../entities/Tracker"
import ITrackerUseCase from "./interfaces/ITrackerUseCase"

export default class TrackerUseCase implements ITrackerUseCase {
  private trackerRepository: ITrackerRepository
  private carrierRepository: ICarrierRepository

  constructor(
    trackerRepository: ITrackerRepository,
    carrierRepository: ICarrierRepository
  ) {
    this.trackerRepository = trackerRepository
    this.carrierRepository = carrierRepository
  }

  async getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    const {
      isError,
      message,
      data: carrier
    } = await this.carrierRepository.getCarrier(carrierId)

    if (isError) {
      return new LayerDTO({ isError, message })
    }

    return this.trackerRepository.getDelivery(carrier, trackingNumber)
  }

  async addTracker(): Promise<ILayerDTO<boolean>> {
    const tracker = new Tracker({
      id: this.generateUUID()
    })

    return this.trackerRepository.addTracker(tracker)
  }

  async getTrackers(): Promise<ILayerDTO<ITracker[]>> {
    const { isError, message, data } =
      await this.trackerRepository.getTrackers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const trackers = data.map((trackerDTO: ITrackerDTO) => {
      return this.convertToEntity(trackerDTO)
    })

    return new LayerDTO({
      data: trackers
    })
  }

  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>> {
    return this.trackerRepository.deleteTracker(trackerId)
  }

  clearTrackers(): Promise<ILayerDTO<boolean>> {
    return this.trackerRepository.clearTrackers()
  }

  patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>> {
    return this.trackerRepository.patchTracker(id, trackerProps)
  }

  protected generateUUID(): string {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

    return template.replace(/[xy]/g, (c) => {
      const r = (Date.now() + Math.random() * 16) % 16 | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  protected convertToEntity(trackerDTO: ITrackerDTO): ITracker {
    return new Tracker({
      id: trackerDTO.id,
      carrierId: trackerDTO.carrierId,
      label: trackerDTO.label,
      trackingNumber: trackerDTO.trackingNumber,
      memos: trackerDTO.memos
    })
  }
}
