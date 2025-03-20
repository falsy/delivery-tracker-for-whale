import { render, screen } from "@testing-library/react"
import Header from "@components/atoms/Header"

describe("Header", () => {
  it("헤더가 정상적으로 렌더링되는지 확인", () => {
    const title = "택배 배송 조회"
    render(<Header title={title} />)

    expect(
      screen.getByRole("heading", { level: 1, name: title })
    ).toBeInTheDocument()
  })
})
