"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayerDTO_1 = require("../dtos/LayerDTO");
class TrackerUseCase {
    constructor(trackerRepository, carrierRepository) {
        this.trackerRepository = trackerRepository;
        this.carrierRepository = carrierRepository;
    }
    async getDelivery(carrierId, trackingNumber) {
        const { isError, message, data: carrier } = await this.carrierRepository.getCarrier(carrierId);
        if (isError) {
            return new LayerDTO_1.default({ isError, message });
        }
        return this.trackerRepository.getDelivery(carrier, trackingNumber);
    }
}
exports.default = TrackerUseCase;
//# sourceMappingURL=TrackerUseCase.js.map