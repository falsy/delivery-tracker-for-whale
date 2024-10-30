import IDeliveryStateVO from "./interfaces/IDeliveryStateVO";
export default class DeliveryStateVO implements IDeliveryStateVO {
    readonly id: string;
    readonly name: string;
    constructor(params?: {
        id?: string;
        name?: string;
    });
}
//# sourceMappingURL=DeliveryStateVO.d.ts.map