import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import StateBox from "@components/molecules/StateBox"
import IDeliveryProgressVO from "@domains/vos/interfaces/IDeliveryProgressVO"

describe("StateBox", () => {
  const mockDeliveryState = {
    from: "서울 물류센터",
    to: "부산 고객 주소",
    state: "배송 완료"
  }

  const mockProgresses: IDeliveryProgressVO[] = [
    {
      state: { id: "1", name: "배송 출발" },
      time: "2025-03-11 10:00",
      location: "서울센터",
      description: "배송이 시작되었습니다."
    },
    {
      state: { id: "2", name: "배송 중" },
      time: "2025-03-11 12:30",
      location: "경기 물류센터",
      description: "물류센터에서 이동 중입니다."
    },
    {
      state: { id: "3", name: "배송 완료" },
      time: "2025-03-11 15:00",
      location: "부산 고객 주소",
      description: "배송이 완료되었습니다."
    }
  ]

  it("로딩 중일 때 LoadingBox가 렌더링되는지 확인", () => {
    render(
      <StateBox
        isPending={true}
        deliveryErrorMessage=""
        deliveryState={mockDeliveryState}
        progresses={mockProgresses}
        onClose={() => {}}
      />
    )

    expect(screen.getByText("loading...")).toBeInTheDocument()
  })

  it("에러 메시지가 있을 때 DeliveryErrorMessage가 렌더링되는지 확인", () => {
    render(
      <StateBox
        isPending={false}
        deliveryErrorMessage="배송 정보를 찾을 수 없습니다."
        deliveryState={mockDeliveryState}
        progresses={[]}
        onClose={() => {}}
      />
    )

    expect(
      screen.getByText("배송 정보를 찾을 수 없습니다.")
    ).toBeInTheDocument()
  })

  it("배송 상태가 있을 때 StateSummary와 StateList가 렌더링되는지 확인", () => {
    render(
      <StateBox
        isPending={false}
        deliveryErrorMessage=""
        deliveryState={mockDeliveryState}
        progresses={mockProgresses}
        onClose={() => {}}
      />
    )

    expect(screen.getByText("발송지")).toBeInTheDocument()
    expect(screen.getByText("도착지")).toBeInTheDocument()
    expect(screen.getByText("배달결과")).toBeInTheDocument()

    mockProgresses.forEach((progress) => {
      expect(screen.getByText(`[${progress.state.name}]`)).toBeInTheDocument()
      expect(screen.getByText(progress.time)).toBeInTheDocument()
      expect(screen.getByText(`[${progress.location}]`)).toBeInTheDocument()
      expect(screen.getByText(progress.description)).toBeInTheDocument()
    })
  })

  it("닫기 버튼 클릭 시 onClose 핸들러가 호출되는지 확인", () => {
    const onCloseMock = vi.fn()
    render(
      <StateBox
        isPending={false}
        deliveryErrorMessage=""
        deliveryState={mockDeliveryState}
        progresses={mockProgresses}
        onClose={onCloseMock}
      />
    )

    const closeButton = screen.getByRole("button", { name: "닫기" })
    fireEvent.click(closeButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
