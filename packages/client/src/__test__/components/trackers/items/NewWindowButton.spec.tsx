import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import NewWinodwButton from "@components/trackers/items/NewWinodwButton"
import carriers from "../../../mocks/carrierMock"

describe("새창 조회 버튼", () => {
  const carrier = carriers[0]

  it("버튼이 정상적으로 렌더링 되어야 한다.", () => {
    render(<NewWinodwButton carrier={carrier} trackingNumber={"1234"} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("버튼을 누르면 새로운 윈도우를 호출한다.", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null)
    const trackerNumber = "1234"

    render(<NewWinodwButton carrier={carrier} trackingNumber={trackerNumber} />)

    const addDeliveryButton = screen.getByRole("button")

    await userEvent.click(addDeliveryButton)

    // window.open이 올바르게 호출되었는지 확인
    await waitFor(() => {
      expect(openSpy).toHaveBeenCalledWith(
        carrier.popupURL + trackerNumber,
        "",
        "resizable=yes,scrollbars=yes,width=900,height=700"
      )
    })

    openSpy.mockRestore()
  })
})
