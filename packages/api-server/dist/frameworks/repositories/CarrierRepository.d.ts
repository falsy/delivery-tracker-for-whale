import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO";
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository";
import CarrierModel from "../models/CarrierModel";
export default class CarrierRepository implements ICarrierRepository {
    private carrierModel;
    constructor(carrierModel: typeof CarrierModel);
    getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>>;
    getCarrier(carrierId: string): Promise<ILayerDTO<ICarrierDTO>>;
}
//# sourceMappingURL=CarrierRepository.d.ts.map