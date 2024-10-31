"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const CarrierModel_1 = require("../models/CarrierModel");
const LayerDTO_1 = require("../../domains/dtos/LayerDTO");
const CarrierDTO_1 = require("../../domains/dtos/CarrierDTO");
let CarrierRepository = class CarrierRepository {
    constructor(carrierModel) {
        this.carrierModel = carrierModel;
    }
    async getCarriers() {
        try {
            const carrierModels = await this.carrierModel.findAll();
            const carriers = carrierModels.map((model) => {
                return new CarrierDTO_1.default({
                    id: model.uid,
                    no: model.no,
                    name: model.name,
                    displayName: model.displayName,
                    isCrawlable: model.isCrawlable,
                    isPopupEnabled: model.isPopupEnabled,
                    popupURL: model.popupURL
                });
            });
            return new LayerDTO_1.default({
                data: carriers
            });
        }
        catch (error) {
            return new LayerDTO_1.default({
                isError: true,
                message: error.message
            });
        }
    }
    async getCarrier(carrierId) {
        try {
            const carrierModel = await this.carrierModel.findOne({
                where: { uid: carrierId }
            });
            const carrier = new CarrierDTO_1.default({
                id: carrierModel.uid,
                no: carrierModel.no,
                name: carrierModel.name,
                displayName: carrierModel.displayName,
                isCrawlable: carrierModel.isCrawlable,
                isPopupEnabled: carrierModel.isPopupEnabled,
                popupURL: carrierModel.popupURL
            });
            return new LayerDTO_1.default({
                data: carrier
            });
        }
        catch (error) {
            return new LayerDTO_1.default({
                isError: true,
                message: error.message
            });
        }
    }
};
CarrierRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(CarrierModel_1.default)),
    __metadata("design:paramtypes", [Object])
], CarrierRepository);
exports.default = CarrierRepository;
//# sourceMappingURL=CarrierRepository.js.map