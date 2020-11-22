import DeliveryDTO, { IDeliveryDTO, IDeliveryParams } from "../dto/DeliveryDTO";
import { IStorageRepo } from "../repositories/interfaces/storageRepo"
import { IController } from "./interface"

class Controller implements IController {

  constructor(
    private readonly storage: IStorageRepo,
  ) {}

  getDelivery(): Array<IDeliveryDTO> {
    return this.storage.getDelivery()
  }

  setDelivery(delivery: Array<IDeliveryParams>) {
    return this.storage.setDelivery(delivery.map(data => new DeliveryDTO(data)))
  }

  removeDelivery(): void {
    this.storage.removeDelivery()
  }

}

export default Controller