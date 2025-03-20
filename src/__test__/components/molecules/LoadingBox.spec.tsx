import { render, screen } from "@testing-library/react"
import LoadingBox from "@components/molecules/LoadingBox"

describe("LoadingBox", () => {
  it("로딩 박스가 정상적으로 렌더링되는지 확인", () => {
    render(<LoadingBox />)

    expect(screen.getByText("loading...")).toBeInTheDocument()
  })
})
