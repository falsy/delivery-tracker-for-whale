import ICarrierDTO from "../../../core/dtos/interfaces/ICarrierDTO"
import ILayerDTO from "../../../core/dtos/interfaces/ILayerDTO"

export default interface ICarrierController {
  getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>>
}
