import { IAPIDeliveryDTO } from "../dto/APIDeliveryDTO"
import DeliveryDTO, { IDeliveryDTO, IDeliveryParams } from "../dto/DeliveryDTO"
import { IRemoteRepo } from "../repositories/interfaces/remoteRepo"
import { IStorageRepo } from "../repositories/interfaces/storageRepo"
import { IController } from "./interface"

class Controller implements IController {

  constructor(
    private readonly storage: IStorageRepo,
    private readonly remote: IRemoteRepo
  ) {}

  getDeliveryAPI(id: string, code: string): Promise<IAPIDeliveryDTO | string> {
    return this.remote.getDeliveray(id, code)
  }

  getDelivery(): Array<IDeliveryDTO> {
    return this.storage.getDelivery()
  }

  setDelivery(delivery: Array<IDeliveryParams>): void {
    this.storage.setDelivery(delivery.map(data => new DeliveryDTO(data)))
  }

  removeDelivery(): void {
    this.storage.removeDelivery()
  }

}

export default Controller