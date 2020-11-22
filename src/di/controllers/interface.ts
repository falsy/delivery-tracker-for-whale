import { IAPIDeliveryDTO } from "../dto/APIDeliveryDTO";
import { IDeliveryDTO, IDeliveryParams } from "../dto/DeliveryDTO";

export interface IController {
  getDeliveryAPI(id: string, code: string): Promise<IAPIDeliveryDTO | string>
  getDelivery(): Array<IDeliveryDTO>
  setDelivery(delivery: Array<IDeliveryParams>): void
  removeDelivery(): void
}