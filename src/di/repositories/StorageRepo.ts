import { IDeliveryDTO } from "../dto/DeliveryDTO"
import { IWebStorage } from "../infrastructures/interfaces/webStorage"
import { IStorageRepo } from "./interfaces/storageRepo"

class StorageRepo implements IStorageRepo {
  
  constructor(
    private readonly storage: IWebStorage
  ) {}

  setDelivery(delivery: Array<IDeliveryDTO>): void {
    this.storage.setDelivery(delivery)
  }

  getDelivery(): Array<IDeliveryDTO> {
    return this.storage.getDelivery()
  }

  removeDelivery(): void {
    this.storage.removeDelivery()
  }

}

export default StorageRepo