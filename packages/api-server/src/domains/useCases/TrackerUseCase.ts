import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository"
import ITrackerUseCase from "./interfaces/ITrackerUseCase"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import LayerDTO from "@domains/dtos/LayerDTO"

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
}
