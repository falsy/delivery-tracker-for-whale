"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LayerDTO {
    constructor({ isError = false, message = "success", data, errorCode, errorDetails } = {}) {
        this.isError = isError;
        this.message = message;
        this.data = data;
        this.errorCode = errorCode;
        this.errorDetails = errorDetails;
    }
}
exports.default = LayerDTO;
//# sourceMappingURL=LayerDTO.js.map