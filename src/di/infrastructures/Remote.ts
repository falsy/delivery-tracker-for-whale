import APIDeliveryDTO, { IAPIDeliveryDTO } from "../dto/APIDeliveryDTO"
import { IRemote } from "./interfaces/remote"

class Remote implements IRemote {

  async getDeliveray(id: string, code: string): Promise<IAPIDeliveryDTO | string> {
    const deliveryData = await fetch(`https://tracker.falsy.me/carriers/${id}/tracks/${code}`, {
      method: 'GET'
    }).then(res => res.json())

    if(deliveryData?.message) {
      return deliveryData.message
    }
    
    if(deliveryData?.carrier && deliveryData?.from && deliveryData?.progresses && deliveryData?.state && deliveryData?.to) {
      return new APIDeliveryDTO(deliveryData)
    }

    return '네트워크 통신이 원할하지 않습니다.'
  }

}

export default Remote;