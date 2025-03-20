import { render, screen } from "@testing-library/react"
import Loading from "@components/atoms/Loading"

describe("Loading", () => {
  it("로딩 스피너가 화면에 렌더링되는지 확인", () => {
    render(<Loading />)

    expect(screen.getByText("loading...")).toBeInTheDocument()

    const spinner = screen.getByRole("status", { hidden: true })
    expect(spinner).toBeInTheDocument()
  })
})
