"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringHelper {
    static trim(value) {
        return value.replace(/([\n\t]{1,}|\s{2,})/g, " ").trim();
    }
}
exports.default = StringHelper;
//# sourceMappingURL=StringHelper.js.map