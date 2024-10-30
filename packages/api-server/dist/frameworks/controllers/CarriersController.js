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
let CarriersController = class CarriersController {
    constructor(carriersUseCase) {
        this.carriersUseCase = carriersUseCase;
    }
    getCarriers() {
        return this.carriersUseCase.getCarriers();
    }
    getCarrier(carrierId) {
        return this.carriersUseCase.getCarrier(carrierId);
    }
};
__decorate([
    (0, common_1.Get)("carriers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarriersController.prototype, "getCarriers", null);
__decorate([
    (0, common_1.Get)("carrier/:carrierId"),
    __param(0, (0, common_1.Param)("carrierId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarriersController.prototype, "getCarrier", null);
CarriersController = __decorate([
    (0, common_1.Controller)(""),
    __param(0, (0, common_1.Inject)("ICarrierUseCase")),
    __metadata("design:paramtypes", [Object])
], CarriersController);
exports.default = CarriersController;
//# sourceMappingURL=CarriersController.js.map