import { DELIVERY_DATA, DELIVERY_INIT } from "../../constants"
import DeliveryDTO, { IDeliveryDTO, IDeliveryParams } from "../dto/DeliveryDTO"
import { IWebStorage } from "./interfaces/webStorage"

class WebStorage implements IWebStorage {
  
  private readonly local: Storage

  constructor() {
    this.local = window.localStorage
  }

  setDelivery(delivery: Array<IDeliveryDTO>): void {
    this.local.setItem(DELIVERY_DATA, JSON.stringify(delivery))
  }

  getDelivery(): Array<IDeliveryDTO> {
    if(this.local.getItem(DELIVERY_DATA) === null ) {
     return [new DeliveryDTO(DELIVERY_INIT)]
    }

    try {
      const deliveryData = JSON.parse(this.local.getItem(DELIVERY_DATA))
      return deliveryData.map((data: IDeliveryParams) => new DeliveryDTO(data))
    } catch(e) {
      console.log(e)
      return [new DeliveryDTO(DELIVERY_INIT)]
    }
  }

  removeDelivery(): void {
    this.local.removeItem(DELIVERY_DATA)
  }

}

export default WebStorage