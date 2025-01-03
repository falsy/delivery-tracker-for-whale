/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRACKER_LIST } from "@constants/index"
import ITrackerDTO from "@domains/dtos/interfaces/ITrackerDTO"
import Migration from "@services/Migration"
import carriers from "../mocks/carrierMock"

describe("Migration", () => {
  beforeEach(() => {
    ;(window as any).whale = {}
    ;(window as any).whale.storage = {}
    ;(window as any).whale.storage.local = {
      set: jest.fn()
    }
  })

  test("레거시 데이터가 없다면 마이그레이션을 수행하지 않는다.", async () => {
    const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "getItem")
    const whaleStorageSpy = jest.spyOn(
      (window as any).whale.storage.local,
      "set"
    )

    localStorageSpy.mockImplementation((key) => {
      if (key === "DELIVERY_DATA") {
        return null
      }
      if (key === "TRACKER_LIST") {
        return null
      }
      return null
    })

    await new Migration(carriers).migration()

    // 레거시 데이터가 없으므로 Chrome Storage의 set 메서드가 호출되지 않아야 한다.
    expect(whaleStorageSpy).not.toHaveBeenCalled()
  })

  test("레거시 데이터가 있다면 마이그레이션을 수행한다. (migration v1.7.8)", async () => {
    const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "getItem")
    const whaleStorageSpy = jest.spyOn(
      (window as any).whale.storage.local,
      "set"
    )

    whaleStorageSpy.mockImplementation((data: ITrackerDTO[]) => {
      return data
    })

    const moackStorageData = {
      uid: 1,
      label: "label",
      code: "1234567890",
      isInline: false,
      isWindow: false,
      memos: []
    }

    localStorageSpy.mockImplementation((key) => {
      if (key === "DELIVERY_DATA") {
        return JSON.stringify([moackStorageData])
      }
      if (key === "TRACKER_LIST") {
        return null
      }
      return null
    })

    await new Migration(carriers).migration()

    // 레거시 데이터가 있으므로 Chrome Storage의 set 메서드가 호출되어야 한다.
    expect(whaleStorageSpy).toHaveBeenCalled()

    const storageData = whaleStorageSpy.mock.calls[0][0]
    const trackerData = JSON.parse(storageData[TRACKER_LIST])[0]

    // Chrome Storage에 저장할 데이터가 올바른지 확인한다.
    // moackStorageData.uid: 1 == carriers[0](우체국 택배)
    expect(trackerData.carrierId).toEqual(carriers[0].id)
    expect(trackerData.label).toEqual(moackStorageData.label)
    expect(trackerData.trackingNumber).toEqual(moackStorageData.code)
    expect(trackerData.memos).toEqual(moackStorageData.memos)
  })

  test("레거시 데이터가 있다면 마이그레이션을 수행한다. (migration v1.8.0)", async () => {
    const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "getItem")
    const whaleStorageSpy = jest.spyOn(
      (window as any).whale.storage.local,
      "set"
    )

    whaleStorageSpy.mockImplementation((data: ITrackerDTO[]) => {
      return data
    })

    const moackStorageData = {
      id: "7b520321-7385-440f-8fbb-c945a7bd2234",
      carrierId: "2de90e9c-1fda-11ef-8884-0a8cb08d3aea",
      label: "label",
      trackingNumber: "6864033374390",
      memos: ["memo"]
    }

    localStorageSpy.mockImplementation((key) => {
      if (key === "DELIVERY_DATA") {
        return null
      }
      if (key === TRACKER_LIST) {
        return JSON.stringify([moackStorageData])
      }
      return null
    })

    await new Migration(carriers).migration()

    // 레거시 데이터가 있으므로 Chrome Storage의 set 메서드가 호출되어야 한다.
    expect(whaleStorageSpy).toHaveBeenCalled()

    const storageData = whaleStorageSpy.mock.calls[0][0]
    const trackerData = JSON.parse(storageData[TRACKER_LIST])[0]

    // Chrome Storage에 저장할 데이터가 올바른지 확인한다.
    expect(trackerData.carrierId).toEqual(moackStorageData.carrierId)
    expect(trackerData.label).toEqual(moackStorageData.label)
    expect(trackerData.trackingNumber).toEqual(moackStorageData.trackingNumber)
    expect(trackerData.memos).toEqual(moackStorageData.memos)
  })
})
