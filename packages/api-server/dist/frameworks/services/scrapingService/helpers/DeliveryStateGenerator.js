"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryStateVO_1 = require("../../../../domains/vos/DeliveryStateVO");
class DeliveryStateGenerator {
    static getState(status) {
        switch (status) {
            case "상품준비중":
                return new DeliveryStateVO_1.default({
                    id: "preparing_item",
                    name: "상품준비중"
                });
            case "상품인수":
                return new DeliveryStateVO_1.default({
                    id: "item_received",
                    name: "상품인수"
                });
            case "배달출발":
                return new DeliveryStateVO_1.default({
                    id: "out_for_delivery",
                    name: "배달출발"
                });
            case "배달완료":
                return new DeliveryStateVO_1.default({
                    id: "delivered",
                    name: "배달완료"
                });
            case "상품이동중":
                return new DeliveryStateVO_1.default({
                    id: "in_transit",
                    name: "상품이동중"
                });
        }
    }
}
exports.default = DeliveryStateGenerator;
//# sourceMappingURL=DeliveryStateGenerator.js.map