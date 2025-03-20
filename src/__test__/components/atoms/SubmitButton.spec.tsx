import { render, screen, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import SubmitButton from "@components/atoms/SubmitButton"

describe("SubmitButton", () => {
  it("버튼이 정상적으로 렌더링되는지 확인", () => {
    render(<SubmitButton handleClick={() => {}} />)

    expect(
      screen.getByRole("button", { name: "submit-button" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "submit-button" })
    ).toHaveTextContent("조회")
  })

  it("버튼 클릭 시 handleClick 핸들러가 호출되는지 확인", () => {
    const handleClick = vi.fn()
    render(<SubmitButton handleClick={handleClick} />)

    const button = screen.getByRole("button", { name: "submit-button" })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
