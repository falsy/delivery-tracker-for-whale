"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CarrierUseCase {
    constructor(carrierRepository) {
        this.carrierRepository = carrierRepository;
    }
    getCarriers() {
        return this.carrierRepository.getCarriers();
    }
    getCarrier(carrierId) {
        return this.carrierRepository.getCarrier(carrierId);
    }
}
exports.default = CarrierUseCase;
//# sourceMappingURL=CarrierUseCase.js.map