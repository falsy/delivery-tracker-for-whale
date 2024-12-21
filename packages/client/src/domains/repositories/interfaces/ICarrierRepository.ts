import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"

export default interface ICarrierRepository {
  getCachedCarriers(): ICarrierDTO[]
  setCachedCarriers(carriers: ICarrierDTO[]): void
  getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>>
}
