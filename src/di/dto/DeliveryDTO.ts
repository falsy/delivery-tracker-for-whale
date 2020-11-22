import { DELIVERY_LIST } from "../../constants"

export interface IDeliveryParams {
  uid: number
  label: string
  code: string
  isInline: boolean
  isWindow: boolean
  idx?: string | number
}

export interface IDeliveryDTO {
  uid: number
  label: string
  code: string
  isInline: boolean
  isWindow: boolean
}

class DeliveryDTO implements IDeliveryDTO {
  uid: number
  label: string
  code: string
  isInline: boolean
  isWindow: boolean
  
  constructor(params: IDeliveryParams) {
    this.uid = Number(params.uid) || Number(params.idx)
    this.label = params.label || ''
    this.code = params.code || ''
    this.isInline = params.isInline
    this.isWindow = params.isWindow

    const mappingData = DELIVERY_LIST.filter(d => d.uid === this.uid)[0]
    if(mappingData) {
      this.isInline = mappingData.isInline
      this.isWindow = mappingData.isWindow
    }
  }
}

export default DeliveryDTO