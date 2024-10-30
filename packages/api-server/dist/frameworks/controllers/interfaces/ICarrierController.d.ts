import ICarrierDTO from "../../../domains/dtos/interfaces/ICarrierDTO";
import ILayerDTO from "../../../domains/dtos/interfaces/ILayerDTO";
export default interface ICarrierController {
    getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>>;
    getCarrier(carrierId: string): Promise<ILayerDTO<ICarrierDTO>>;
}
//# sourceMappingURL=ICarrierController.d.ts.map