import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import BasicButton from "@components/atoms/BasicButton"

describe("BasicButton", () => {
  it("버튼이 정상적으로 렌더링되는지 확인", () => {
    render(<BasicButton value="클릭" onClick={() => {}} />)
    const button = screen.getByRole("button", { name: "클릭" })
    expect(button).toBeInTheDocument()
  })

  it("버튼 클릭 시 onClick 핸들러가 호출되는지 확인", () => {
    const handleClick = vi.fn()
    render(<BasicButton value="클릭" onClick={handleClick} />)
    const button = screen.getByRole("button", { name: "클릭" })

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
