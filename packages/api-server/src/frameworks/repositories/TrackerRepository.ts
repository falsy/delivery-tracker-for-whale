import { Inject, Injectable } from "@nestjs/common"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP"
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository"
import ScrapingService from "@frameworks/services/scrapingService"

@Injectable()
export default class TrackerRepository implements ITrackerRepository {
  constructor(
    @Inject("IServerHTTP")
    protected readonly serverHTTP: IServerHTTP
  ) {}

  async getDelivery(
    carrier: ICarrier,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    const { name } = carrier
    return ScrapingService.getTrack(this.serverHTTP, name, trackingNumber)
  }
}
