import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import TrackingNumberInput from "@components/atoms/TrackingNumberInput"

describe("TrackingNumberInput", () => {
  it("입력 필드가 정상적으로 렌더링되는지 확인", () => {
    render(
      <TrackingNumberInput
        trackingNumber="123456789"
        changeTrackingNumber={() => {}}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("123456789")
  })

  it("입력 필드 변경 시 changeTrackingNumber 핸들러가 호출되는지 확인", () => {
    const changeTrackingNumber = vi.fn()
    render(
      <TrackingNumberInput
        trackingNumber=""
        changeTrackingNumber={changeTrackingNumber}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    fireEvent.change(input, { target: { value: "987654321" } })

    expect(changeTrackingNumber).toHaveBeenCalledTimes(1)
    expect(changeTrackingNumber).toHaveBeenCalledWith("987654321")
  })
})
