import { IDeliveryDTO } from "../../dto/DeliveryDTO"

export interface IWebStorage {
  setDelivery(delivery: Array<IDeliveryDTO>): void
  getDelivery(): Array<IDeliveryDTO>
  removeDelivery(): void
}