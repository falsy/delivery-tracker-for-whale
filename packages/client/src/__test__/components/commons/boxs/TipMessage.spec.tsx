import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import TipMessage from "@components/commons/boxs/TipMessage"

describe("TipMessage", () => {
  const resetTrackers = vi.fn()

  it("TipMessage 컴포넌트 렌더링 확인", () => {
    render(<TipMessage resetTrackers={resetTrackers} />)

    expect(screen.getByRole("button", { name: "[초기화]" })).toBeInTheDocument()
  })

  it("초기화 버튼 동작 확인", async () => {
    render(<TipMessage resetTrackers={resetTrackers} />)

    const resetButton = screen.getByRole("button", { name: "[초기화]" })
    await userEvent.click(resetButton)

    expect(resetTrackers).toHaveBeenCalled()
  })
})
