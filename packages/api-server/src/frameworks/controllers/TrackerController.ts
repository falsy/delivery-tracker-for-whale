import { Controller, Get, Inject, Param } from "@nestjs/common"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ITrackerUseCase from "@domains/useCases/interfaces/ITrackerUseCase"
import ITrackerController from "./interfaces/ITrackerController"

@Controller("tracker")
export default class TrackerController implements ITrackerController {
  constructor(
    @Inject("ITrackerUseCase")
    private readonly trackerUseCase: ITrackerUseCase
  ) {}

  @Get(":carrierId/:trackingNumber")
  getDelivery(
    @Param("carrierId") carrierId: string,
    @Param("trackingNumber") trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    return this.trackerUseCase.getDelivery(carrierId, trackingNumber)
  }
}
