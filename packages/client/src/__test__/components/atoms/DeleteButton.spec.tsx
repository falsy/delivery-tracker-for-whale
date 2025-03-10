import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import DeleteButton from "@components/atoms/DeleteButton"

describe("DeleteButton", () => {
  it("버튼이 정상적으로 렌더링되는지 확인", () => {
    render(<DeleteButton handleClick={() => {}} />)
    expect(
      screen.getByRole("button", { name: "delete-button" })
    ).toBeInTheDocument()
  })

  it("클릭 시 handleClick 핸들러가 호출되는지 확인", () => {
    const handleClick = vi.fn()
    render(<DeleteButton handleClick={handleClick} />)

    const button = screen.getByRole("button", { name: "delete-button" })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
