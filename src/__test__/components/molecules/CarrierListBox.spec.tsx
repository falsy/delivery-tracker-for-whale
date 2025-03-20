import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import CarrierListBox from "@components/molecules/CarrierListBox"
import carriers from "../../mocks/carrierMock"

describe("CarrierListBox", () => {
  it("드롭다운이 정상적으로 렌더링되는지 확인", () => {
    render(
      <CarrierListBox
        carriers={carriers}
        carrier={carriers[0]}
        changeCarrierId={() => {}}
      />
    )

    expect(screen.getByTestId("carrier-select-box")).toBeInTheDocument()
    expect(screen.getByTestId("carrier-select-box")).toHaveTextContent(
      "우체국 택배"
    )
  })

  it("드롭다운에서 옵션을 선택하면 changeCarrierId 핸들러가 호출되는지 확인", () => {
    const changeCarrierId = vi.fn()
    render(
      <CarrierListBox
        carriers={carriers}
        carrier={carriers[0]}
        changeCarrierId={changeCarrierId}
      />
    )

    const button = screen.getByTestId("carrier-select-box")
    fireEvent.click(button)

    const option = screen.getByText("한진 택배")
    fireEvent.click(option)

    expect(changeCarrierId).toHaveBeenCalledTimes(1)
    expect(changeCarrierId).toHaveBeenCalledWith(
      "2de9109b-1fda-11ef-8884-0a8cb08d3aea"
    )
  })
})
