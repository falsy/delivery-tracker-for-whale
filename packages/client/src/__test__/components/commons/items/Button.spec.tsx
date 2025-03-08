import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import Button from "@components/commons/items/Button"

describe("Button", () => {
  it("버튼이 정상적으로 렌더링 되어야 한다.", () => {
    const clickEvent = vi.fn()

    render(<Button text={"추가"} handleClick={clickEvent} />)

    expect(screen.getByText("추가")).toBeInTheDocument()
  })

  it("버튼을 누르면 props 함수를 호출한다.", async () => {
    const clickEvent = vi.fn()

    render(<Button text={"추가"} handleClick={clickEvent} />)

    expect(screen.getByText("추가")).toBeInTheDocument()

    const addDeliveryButton = screen.getByText("추가")

    await userEvent.click(addDeliveryButton)

    await waitFor(() => {
      expect(clickEvent).toHaveBeenCalled()
    })
  })
})
