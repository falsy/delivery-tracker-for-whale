import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrier from "@domains/entities/interfaces/ICarrier"

export default interface ICarrierUseCase {
  getCachedCarriers(): ICarrier[]
  getCarriers(): Promise<ILayerDTO<ICarrier[]>>
}
