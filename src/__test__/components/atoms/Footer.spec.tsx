import { render, screen } from "@testing-library/react"
import Footer from "@components/atoms/Footer"

describe("Footer", () => {
  it("푸터가 정상적으로 렌더링되는지 확인", () => {
    render(<Footer />)

    expect(screen.getByText("Falsy")).toBeInTheDocument()
    expect(screen.getByText("Falsy").closest("a")).toHaveAttribute(
      "href",
      "https://falsy.me"
    )
    expect(screen.getByText(/©/)).toBeInTheDocument()
  })
})
