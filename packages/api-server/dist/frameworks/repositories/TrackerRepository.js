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
const scrapingService_1 = require("../services/scrapingService");
let TrackerRepository = class TrackerRepository {
    constructor(serverHTTP) {
        this.serverHTTP = serverHTTP;
    }
    async getDelivery(carrier, trackingNumber) {
        const { name } = carrier;
        return scrapingService_1.default.getTrack(this.serverHTTP, name, trackingNumber);
    }
};
TrackerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IServerHTTP")),
    __metadata("design:paramtypes", [Object])
], TrackerRepository);
exports.default = TrackerRepository;
//# sourceMappingURL=TrackerRepository.js.map