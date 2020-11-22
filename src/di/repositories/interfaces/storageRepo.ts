import { IDeliveryDTO } from "../../dto/DeliveryDTO"

export interface IStorageRepo {
  setDelivery(delivery: Array<IDeliveryDTO>): void
  getDelivery(): Array<IDeliveryDTO>
  removeDelivery(): void
}