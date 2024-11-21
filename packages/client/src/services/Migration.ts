import { TRACKER_LIST } from "@constants/index"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import Tracker from "@domains/entities/Tracker"

export default class Migration {
  private carrierList: ICarrierDTO[]

  constructor(carrierList: ICarrierDTO[]) {
    this.carrierList = carrierList
  }

  async migration() {
    if (typeof globalThis.whale?.storage?.local === "undefined") {
      return
    }
    await this.migration1_7_8()
    await this.migration1_8_0()
  }

  private migration1_7_8() {
    return new Promise((resolve) => {
      const oldData = window.localStorage.getItem("DELIVERY_DATA")
      if (oldData === null) {
        resolve(false)
        return
      }

      try {
        const oldObj = JSON.parse(oldData)
        const newTrackers = oldObj.map(({ uid, label, code, memos }) => {
          return new Tracker({
            id: this.generateUUID(),
            carrierId: this.carrierList.find((carrier) => carrier.no === uid)
              .id,
            label: label,
            trackingNumber: code,
            memos: memos
          })
        })

        const data = {}
        data[TRACKER_LIST] = JSON.stringify(newTrackers)
        globalThis.whale.storage.local.set(data, () => {
          window.localStorage.removeItem("DELIVERY_DATA")
        })
        resolve(true)
      } catch {
        resolve(false)
      }
    })
  }

  private migration1_8_0() {
    return new Promise((resolve) => {
      const oldData = window.localStorage.getItem(TRACKER_LIST)
      if (oldData === null) {
        resolve(false)
        return
      }

      try {
        const data = {}
        data[TRACKER_LIST] = oldData
        globalThis.whale.storage.local.set(data, () => {
          window.localStorage.removeItem(TRACKER_LIST)
        })
        resolve(true)
      } catch {
        resolve(false)
      }
    })
  }

  private generateUUID = (): string => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

    return template.replace(/[xy]/g, (c) => {
      const r = (Date.now() + Math.random() * 16) % 16 | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}
