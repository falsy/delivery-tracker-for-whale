import { IAPIDeliveryDTO } from "../../dto/APIDeliveryDTO"

export interface IRemoteRepo {
  getDeliveray(id: string, code: string): Promise<IAPIDeliveryDTO | string>
}