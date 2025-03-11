import { render, screen } from "@testing-library/react"
import StateSummary from "@components/atoms/StateSummary"

describe("StateSummary", () => {
  const mockState = {
    from: "서울 물류센터",
    to: "부산 고객 주소",
    state: "배송 완료"
  }

  it("테이블 헤더가 정상적으로 렌더링되는지 확인", () => {
    render(<StateSummary state={mockState} />)

    expect(screen.getByText("발송지")).toBeInTheDocument()
    expect(screen.getByText("도착지")).toBeInTheDocument()
    expect(screen.getByText("배달결과")).toBeInTheDocument()
  })

  it("배송 상태 정보가 올바르게 표시되는지 확인", () => {
    render(<StateSummary state={mockState} />)

    expect(screen.getByText(mockState.from)).toBeInTheDocument()
    expect(screen.getByText(mockState.to)).toBeInTheDocument()
    expect(screen.getByText(mockState.state)).toBeInTheDocument()
  })
})
