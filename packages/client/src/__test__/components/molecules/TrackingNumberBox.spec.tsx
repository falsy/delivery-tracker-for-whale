import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import TrackingNumberBox from "@components/molecules/TrackingNumberBox"
import carriers from "../../mocks/carrierMock"

describe("TrackingNumberBox", () => {
  const mockCarrier: ICarrier = carriers[0]

  it("입력 필드가 정상적으로 렌더링되는지 확인", () => {
    render(
      <TrackingNumberBox
        carrier={mockCarrier}
        trackingNumber="123456789"
        changeTrackingNumber={() => {}}
        getDelivery={() => {}}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("123456789")
  })

  it("운송장 번호 입력 시 changeTrackingNumber가 호출되는지 확인", () => {
    const changeTrackingNumber = vi.fn()
    render(
      <TrackingNumberBox
        carrier={mockCarrier}
        trackingNumber=""
        changeTrackingNumber={changeTrackingNumber}
        getDelivery={() => {}}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    fireEvent.change(input, { target: { value: "987654321" } })

    expect(changeTrackingNumber).toHaveBeenCalledTimes(1)
    expect(changeTrackingNumber).toHaveBeenCalledWith("987654321")
  })

  it("팝업 버튼이 렌더링되는지 확인", () => {
    render(
      <TrackingNumberBox
        carrier={mockCarrier}
        trackingNumber="123456789"
        changeTrackingNumber={() => {}}
        getDelivery={() => {}}
      />
    )

    const windowButton = screen.getByRole("button", {
      name: "new-window-button"
    })
    expect(windowButton).toBeInTheDocument()
  })

  it("제출 버튼이 렌더링되는지 확인", () => {
    render(
      <TrackingNumberBox
        carrier={mockCarrier}
        trackingNumber="123456789"
        changeTrackingNumber={() => {}}
        getDelivery={() => {}}
      />
    )

    const submitButton = screen.getByRole("button", { name: "submit-button" })
    expect(submitButton).toBeInTheDocument()
  })

  it("제출 버튼 클릭 시 getDelivery 핸들러가 호출되는지 확인", () => {
    const getDelivery = vi.fn()
    render(
      <TrackingNumberBox
        carrier={mockCarrier}
        trackingNumber="123456789"
        changeTrackingNumber={() => {}}
        getDelivery={getDelivery}
      />
    )

    const submitButton = screen.getByRole("button", { name: "submit-button" })
    fireEvent.click(submitButton)

    expect(getDelivery).toHaveBeenCalledTimes(1)
    expect(getDelivery).toHaveBeenCalledWith(mockCarrier, "123456789")
  })
})
