import { IAPIDeliveryDTO } from "../dto/APIDeliveryDTO"
import { IRemote } from "../infrastructures/interfaces/remote"
import { IRemoteRepo } from "./interfaces/remoteRepo"

class RemoteRepo implements IRemoteRepo{
  
  constructor(
    private readonly remote: IRemote
  ) {}

  getDeliveray(id: string, code: string): Promise<IAPIDeliveryDTO | string> {
    return this.remote.getDeliveray(id, code)
  }
  
}

export default RemoteRepo