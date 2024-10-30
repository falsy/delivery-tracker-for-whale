import IDeliveryLocationVO from "./interfaces/IDeliveryLocationVO";
export default class DeliveryLocationVO implements IDeliveryLocationVO {
    readonly name: string;
    readonly time: string;
    constructor(params?: {
        name?: string;
        time?: string;
        address?: string;
    });
}
//# sourceMappingURL=DeliveryLocationVO.d.ts.map