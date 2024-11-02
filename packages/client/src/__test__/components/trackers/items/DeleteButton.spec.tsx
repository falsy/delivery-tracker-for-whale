import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DeleteButton from "@components/trackers/items/DeleteButton"

describe("트래커 삭제 버튼", () => {
  test("버튼이 정상적으로 렌더링 되어야 한다.", () => {
    const clickEvent = jest.fn()

    render(<DeleteButton handleClick={clickEvent} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("버튼을 누르면 props 함수를 호출한다.", async () => {
    const clickEvent = jest.fn()

    render(<DeleteButton handleClick={clickEvent} />)

    const addDeliveryButton = screen.getByRole("button")

    userEvent.click(addDeliveryButton)

    await waitFor(() => {
      expect(clickEvent).toHaveBeenCalled()
    })
  })
})
