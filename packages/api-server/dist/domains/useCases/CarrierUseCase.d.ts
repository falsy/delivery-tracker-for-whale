import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository";
import ICarrierUseCase from "./interfaces/ICarrierUseCase";
export default class CarrierUseCase implements ICarrierUseCase {
    private carrierRepository;
    constructor(carrierRepository: ICarrierRepository);
    getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>>;
    getCarrier(carrierId: string): Promise<ILayerDTO<ICarrierDTO>>;
}
//# sourceMappingURL=CarrierUseCase.d.ts.map