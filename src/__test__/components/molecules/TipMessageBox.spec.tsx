import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import TipMessageBox from "@components/molecules/TipMessageBox"

describe("TipMessageBox", () => {
  it("초기화 안내 문구가 정상적으로 렌더링되는지 확인", () => {
    render(<TipMessageBox resetTrackers={() => {}} />)

    expect(
      screen.getByText(/서비스가 정상 동작하지 않을 경우 아래의/)
    ).toBeInTheDocument()
  })

  it("초기화 버튼 클릭 시 resetTrackers 핸들러가 호출되는지 확인", () => {
    const resetTrackers = vi.fn()
    render(<TipMessageBox resetTrackers={resetTrackers} />)

    const resetButton = screen.getByRole("button", { name: "reset-button" })
    fireEvent.click(resetButton)

    expect(resetTrackers).toHaveBeenCalledTimes(1)
  })
})
