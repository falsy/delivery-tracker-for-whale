import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"

export default interface IScraper {
  getTrack(trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>>
}
