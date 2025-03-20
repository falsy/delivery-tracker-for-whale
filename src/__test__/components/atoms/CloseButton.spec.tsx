import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import CloseButton from "@components/atoms/CloseButton"

describe("CloseButton", () => {
  it("버튼이 정상적으로 렌더링되는지 확인", () => {
    render(<CloseButton onClick={() => {}} />)
    expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument()
  })

  it("클릭 시 onClick 핸들러가 호출되는지 확인", () => {
    const handleClick = vi.fn()
    render(<CloseButton onClick={handleClick} />)

    const button = screen.getByRole("button", { name: "닫기" })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
