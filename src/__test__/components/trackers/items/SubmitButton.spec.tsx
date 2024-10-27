import SubmitButton from "@components/trackers/items/SubmitButton"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("조회 버튼", () => {
  test("버튼이 정상적으로 렌더링 되어야 한다.", () => {
    const clickEvent = jest.fn()

    render(<SubmitButton handleClick={clickEvent} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("버튼을 누르면 props 함수를 호출한다.", async () => {
    const clickEvent = jest.fn()

    render(<SubmitButton handleClick={clickEvent} />)

    const addDeliveryButton = screen.getByRole("button")

    userEvent.click(addDeliveryButton)

    await waitFor(() => {
      expect(clickEvent).toHaveBeenCalled()
    })
  })
})
