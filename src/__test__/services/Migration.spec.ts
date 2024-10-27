/* eslint-disable @typescript-eslint/no-explicit-any */
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
      } else if (key === "TRACKER_LIST") {
        return null
      }
      return null
    })

    await new Migration(carriers).migration()

    // 레거시 데이터가 없으므로 Whale Storage에 저장하지 않아야 한다.
    expect(whaleStorageSpy).not.toHaveBeenCalled()
  })
})
