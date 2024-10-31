/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TrackerNumberBox from "@components/trackers/boxs/TrackerNumberBox"
import ICarrier from "@domains/entities/interfaces/ICarrier"

describe("TrackerNumberBox 컴포넌트", () => {
  const carrier: ICarrier = {
    id: "carrier-id",
    no: 1,
    name: "carrier",
    displayName: "Carrier",
    isPopupEnabled: true,
    isCrawlable: true,
    popupURL: "https://example.com/track"
  }
  const trackingNumber = "123456789"
  const patchTracker = jest.fn()
  const getDeliveryMock = jest.fn()

  test("초기 렌더링 시 trackingNumber 값이 input 필드에 설정되어야 한다", () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        patchTracker={patchTracker}
        getDelivery={getDeliveryMock}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    expect(input).toHaveValue("123456789")
  })

  test("운송장 번호 입력 값을 변경하면 patchTracker 함수가 호출되어야 한다", async () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        patchTracker={patchTracker}
        getDelivery={getDeliveryMock}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")

    await userEvent.clear(input)
    await userEvent.type(input, "987654321")

    waitFor(() =>
      expect(patchTracker).toHaveBeenCalledWith({ trackingNumber: "987654321" })
    )
  })

  test("isPopupEnabled가 true일 때 NewWindowButton이 렌더링되어야 한다", () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        patchTracker={patchTracker}
        getDelivery={getDeliveryMock}
      />
    )

    expect(screen.getByRole("button", { name: /새창/i })).toBeInTheDocument()
  })

  test("isCrawlable이 true일 때 SubmitButton이 렌더링되어야 한다", () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        patchTracker={patchTracker}
        getDelivery={getDeliveryMock}
      />
    )

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()
  })

  test("제출 버튼 클릭 시 getDelivery 함수가 호출되어야 한다", async () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackingNumber={trackingNumber}
        patchTracker={patchTracker}
        getDelivery={getDeliveryMock}
      />
    )

    const submitButton = screen.getByRole("button", { name: /submit/i })
    await userEvent.click(submitButton)

    expect(getDeliveryMock).toHaveBeenCalledWith("carrier-id", "123456789")
  })
})
