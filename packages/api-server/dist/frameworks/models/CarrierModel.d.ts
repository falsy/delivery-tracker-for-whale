import { Model } from "sequelize-typescript";
export default class CarrierModel extends Model<CarrierModel> {
    id: number;
    uid: string;
    no: number;
    name: string;
    displayName: string;
    isCrawlable: boolean;
    isPopupEnabled: boolean;
    popupURL: string;
}
//# sourceMappingURL=CarrierModel.d.ts.map