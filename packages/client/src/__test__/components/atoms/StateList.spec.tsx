import { render, screen } from "@testing-library/react"
import StateList from "@components/atoms/StateList"

describe("StateList", () => {
  const progresses = [
    {
      state: { name: "배송 출발" },
      time: "2024-03-11 10:00",
      location: "서울센터",
      description: "배송이 시작되었습니다."
    },
    {
      state: { name: "배송 중" },
      time: "2024-03-11 12:30",
      location: "경기 물류센터",
      description: "물류센터에서 이동 중입니다."
    },
    {
      state: { name: "배송 완료" },
      time: "2024-03-11 15:00",
      location: "고객 주소",
      description: "배송이 완료되었습니다."
    }
  ]

  it("테이블이 정상적으로 렌더링되는지 확인", () => {
    render(<StateList progresses={progresses} />)

    expect(screen.getByText("단계/시간")).toBeInTheDocument()
    expect(screen.getByText("위치/현황")).toBeInTheDocument()
  })

  it("배송 상태 데이터가 테이블에 올바르게 표시되는지 확인", () => {
    render(<StateList progresses={progresses} />)

    progresses.forEach((progress) => {
      expect(screen.getByText(`[${progress.state.name}]`)).toBeInTheDocument()
      expect(screen.getByText(progress.time)).toBeInTheDocument()
      expect(screen.getByText(`[${progress.location}]`)).toBeInTheDocument()
      expect(screen.getByText(progress.description)).toBeInTheDocument()
    })
  })
})
