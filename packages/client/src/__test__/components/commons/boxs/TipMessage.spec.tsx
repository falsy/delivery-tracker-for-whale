import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TipMessage from "@components/commons/boxs/TipMessage"

describe("TipMessage", () => {
  const resetTrackers = jest.fn()

  beforeEach(() => {
    jest.spyOn(window, "confirm").mockReturnValue(true)
  })

  test("TipMessage 컴포넌트 렌더링 확인", () => {
    render(<TipMessage resetTrackers={resetTrackers} />)

    expect(screen.getByRole("button", { name: "[초기화]" })).toBeInTheDocument()
  })

  test("초기화 버튼 동작 확인", async () => {
    render(<TipMessage resetTrackers={resetTrackers} />)

    const resetButton = screen.getByRole("button", { name: "[초기화]" })
    userEvent.click(resetButton)

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled()
    })

    // 초기화 함수를 호출
    await waitFor(() => {
      expect(resetTrackers).toHaveBeenCalledWith()
    })
  })
})
