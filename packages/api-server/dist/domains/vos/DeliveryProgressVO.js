"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryStateVO_1 = require("./DeliveryStateVO");
class DeliveryProgressVO {
    constructor(params) {
        this.description = params?.description ? params.description : "";
        this.location = params?.location ? params.location : "";
        this.time = params?.time ? params.time : "";
        this.state = params?.state ? params.state : new DeliveryStateVO_1.default();
    }
}
exports.default = DeliveryProgressVO;
//# sourceMappingURL=DeliveryProgressVO.js.map