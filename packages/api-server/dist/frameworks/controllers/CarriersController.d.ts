import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO";
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO";
import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase";
import ICarrierController from "./interfaces/ICarrierController";
export default class CarriersController implements ICarrierController {
    private readonly carriersUseCase;
    constructor(carriersUseCase: ICarrierUseCase);
    getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>>;
    getCarrier(carrierId: string): Promise<ILayerDTO<ICarrierDTO>>;
}
//# sourceMappingURL=CarriersController.d.ts.map