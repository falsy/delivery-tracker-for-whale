import IDeliveryLocationVO from "@domains/vos/interfaces/IDeliveryLocationVO"
import IDeliveryProgressVO from "@domains/vos/interfaces/IDeliveryProgressVO"
import IDeliveryStateVO from "@domains/vos/interfaces/IDeliveryStateVO"

export default interface IDeliveryDTO {
  readonly from: IDeliveryLocationVO
  readonly progresses: Array<IDeliveryProgressVO>
  readonly state: IDeliveryStateVO
  readonly to: IDeliveryLocationVO
}
