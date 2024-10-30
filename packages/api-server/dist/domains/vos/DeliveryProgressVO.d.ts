import IDeliveryProgressVO from "./interfaces/IDeliveryProgressVO";
import IDeliveryStateVO from "./interfaces/IDeliveryStateVO";
export default class DeliveryProgressVO implements IDeliveryProgressVO {
    readonly description: string;
    readonly location: string;
    readonly time: string;
    readonly state: IDeliveryStateVO;
    constructor(params?: {
        description?: string;
        location?: string;
        time?: string;
        state?: IDeliveryStateVO;
    });
}
//# sourceMappingURL=DeliveryProgressVO.d.ts.map