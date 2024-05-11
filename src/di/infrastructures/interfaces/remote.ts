import { IAPIDeliveryDTO } from "../../dto/APIDeliveryDTO"

export interface IRemote {
  getDeliveray(id: string, code: string): Promise<IAPIDeliveryDTO | string>
}