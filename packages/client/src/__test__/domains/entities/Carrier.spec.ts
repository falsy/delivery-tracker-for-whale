import Carrier from "@domains/entities/Carrier"

describe("Carrier 클래스 테스트", () => {
  const carrierData = {
    id: "1",
    no: 100,
    name: "CarrierName",
    displayName: "Carrier Display Name",
    isCrawlable: true,
    isPopupEnabled: false,
    popupURL: "http://example.com"
  }

  it("생성자를 통해 Carrier 인스턴스가 올바르게 생성된다", () => {
    const carrier = new Carrier(carrierData)

    expect(carrier).toBeInstanceOf(Carrier)
    expect(carrier.id).toBe(carrierData.id)
    expect(carrier.no).toBe(carrierData.no)
    expect(carrier.name).toBe(carrierData.name)
    expect(carrier.displayName).toBe(carrierData.displayName)
    expect(carrier.isCrawlable).toBe(carrierData.isCrawlable)
    expect(carrier.isPopupEnabled).toBe(carrierData.isPopupEnabled)
    expect(carrier.popupURL).toBe(carrierData.popupURL)
  })
})
