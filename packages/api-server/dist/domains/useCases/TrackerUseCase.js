"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayerDTO_1 = require("../dtos/LayerDTO");
const Tracker_1 = require("../entities/Tracker");
const TrackerDTO_1 = require("../dtos/TrackerDTO");
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
    async addTracker() {
        const tracker = new Tracker_1.default({
            id: this.generateUUID()
        });
        return this.trackerRepository.addTracker(tracker);
    }
    async getTrackers() {
        const { isError, message, data } = await this.trackerRepository.getTrackers();
        if (isError) {
            return new LayerDTO_1.default({
                isError,
                message
            });
        }
        const trackers = data.map((trackerDTO) => {
            return this.convertToEntity(trackerDTO);
        });
        const trackerDTOs = trackers.map((tracker) => {
            return this.convertToDTO(tracker);
        });
        return new LayerDTO_1.default({
            data: trackerDTOs
        });
    }
    async deleteTracker(trackerId) {
        return this.trackerRepository.deleteTracker(trackerId);
    }
    async clearTrackers() {
        return this.trackerRepository.clearTrackers();
    }
    async updateCarrierId(tracker, newCarrierId) {
        const trackerEntity = this.convertToEntity(tracker);
        trackerEntity.updateCarrierId(newCarrierId);
        const trackerDTO = this.convertToDTO(trackerEntity);
        return this.trackerRepository.updateTracker(trackerDTO);
    }
    async updateLabel(tracker, newLabel) {
        const trackerEntity = this.convertToEntity(tracker);
        trackerEntity.updateLabel(newLabel);
        const trackerDTO = this.convertToDTO(trackerEntity);
        return this.trackerRepository.updateTracker(trackerDTO);
    }
    async updateTrackingNumber(tracker, newTrackingNumber) {
        const trackerEntity = this.convertToEntity(tracker);
        trackerEntity.updateTrackingNumber(newTrackingNumber);
        const trackerDTO = this.convertToDTO(trackerEntity);
        return this.trackerRepository.updateTracker(trackerDTO);
    }
    async addMemo(tracker) {
        const trackerEntity = this.convertToEntity(tracker);
        trackerEntity.addMemo();
        const trackerDTO = this.convertToDTO(trackerEntity);
        return this.trackerRepository.updateTracker(trackerDTO);
    }
    async updateMemo(tracker, index, newMemo) {
        const trackerEntity = this.convertToEntity(tracker);
        trackerEntity.updateMemo(index, newMemo);
        const trackerDTO = this.convertToDTO(trackerEntity);
        return this.trackerRepository.updateTracker(trackerDTO);
    }
    async deleteMemo(tracker, index) {
        const trackerEntity = this.convertToEntity(tracker);
        trackerEntity.deleteMemo(index);
        const trackerDTO = this.convertToDTO(trackerEntity);
        return this.trackerRepository.updateTracker(trackerDTO);
    }
    generateUUID() {
        const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        return template.replace(/[xy]/g, (c) => {
            const r = (Date.now() + Math.random() * 16) % 16 | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    convertToEntity(trackerDTO) {
        return new Tracker_1.default({
            id: trackerDTO.id,
            carrierId: trackerDTO.carrierId,
            label: trackerDTO.label,
            trackingNumber: trackerDTO.trackingNumber,
            memos: trackerDTO.memos
        });
    }
    convertToDTO(tracker) {
        return new TrackerDTO_1.default({
            id: tracker.id,
            carrierId: tracker.carrierId,
            label: tracker.label,
            trackingNumber: tracker.trackingNumber,
            memos: tracker.memos
        });
    }
}
exports.default = TrackerUseCase;
//# sourceMappingURL=TrackerUseCase.js.map