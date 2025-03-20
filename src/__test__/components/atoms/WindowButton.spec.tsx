import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import WindowButton from "@components/atoms/WindowButton"

describe("WindowButton", () => {
  const url = "https://example.com"

  beforeEach(() => {
    vi.spyOn(window, "open").mockImplementation(() => null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("버튼이 정상적으로 렌더링되는지 확인", () => {
    render(<WindowButton url={url} />)

    const button = screen.getByRole("button", { name: "new-window-button" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("새창")
  })

  it("버튼 클릭 시 window.open이 호출되는지 확인", () => {
    render(<WindowButton url={url} />)

    const button = screen.getByRole("button", { name: "new-window-button" })
    fireEvent.click(button)

    expect(window.open).toHaveBeenCalledTimes(1)
    expect(window.open).toHaveBeenCalledWith(
      url,
      "",
      "resizable=yes,scrollbars=yes,width=900,height=700"
    )
  })
})
