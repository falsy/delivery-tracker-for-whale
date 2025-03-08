import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import SubmitButton from "@components/trackers/items/SubmitButton"

describe("조회 버튼", () => {
  it("버튼이 정상적으로 렌더링 되어야 한다.", () => {
    const clickEvent = vi.fn()

    render(<SubmitButton handleClick={clickEvent} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("버튼을 누르면 props 함수를 호출한다.", async () => {
    const clickEvent = vi.fn()

    render(<SubmitButton handleClick={clickEvent} />)

    const addDeliveryButton = screen.getByRole("button")

    await userEvent.click(addDeliveryButton)

    await waitFor(() => {
      expect(clickEvent).toHaveBeenCalled()
    })
  })
})
