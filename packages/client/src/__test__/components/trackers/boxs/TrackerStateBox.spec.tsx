import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TrackerStateBox from "@components/trackers/boxs/TrackerStateBox"
import IDeliveryProgressVO from "@domains/vos/interfaces/IDeliveryProgressVO"

describe("TrackerStateBox 컴포넌트", () => {
  const deliveryState = {
    from: "Seoul",
    to: "Busan",
    state: "Delivered"
  }

  const progresses: IDeliveryProgressVO[] = [
    {
      state: { id: "a", name: "Shipped" },
      time: "2023-01-01 12:00",
      location: "Seoul",
      description: "Package shipped"
    },
    {
      state: { id: "b", name: "In Transit" },
      time: "2023-01-02 14:00",
      location: "Daejeon",
      description: "In transit"
    },
    {
      state: { id: "c", name: "Delivered" },
      time: "2023-01-03 18:00",
      location: "Busan",
      description: "Package delivered"
    }
  ]

  const closeFncMock = jest.fn()

  test("isLoading이 true일 때 로딩 컴포넌트가 표시되어야 한다", () => {
    render(
      <TrackerStateBox
        isLoading={true}
        errDeliveryMessage=""
        deliveryState={deliveryState}
        progresses={progresses}
        closeFnc={closeFncMock}
      />
    )

    expect(screen.getByText("loading...")).toBeInTheDocument()
  })

  test("isLoading이 false이고 에러 메시지가 있을 때 에러 메시지가 표시되어야 한다", () => {
    render(
      <TrackerStateBox
        isLoading={false}
        errDeliveryMessage="Delivery not found"
        deliveryState={deliveryState}
        progresses={progresses}
        closeFnc={closeFncMock}
      />
    )

    expect(screen.getByText("Delivery not found")).toBeInTheDocument()
  })

  test("배송 상태와 이력이 올바르게 렌더링되어야 한다", () => {
    render(
      <TrackerStateBox
        isLoading={false}
        errDeliveryMessage=""
        deliveryState={deliveryState}
        progresses={progresses}
        closeFnc={closeFncMock}
      />
    )

    expect(screen.getByText("Seoul")).toBeInTheDocument()
    expect(screen.getByText("Busan")).toBeInTheDocument()
    expect(screen.getByText("Delivered")).toBeInTheDocument()

    progresses.forEach((progress) => {
      expect(screen.getByText(`[${progress.state.name}]`)).toBeInTheDocument()
      expect(screen.getByText(progress.time)).toBeInTheDocument()
      expect(screen.getByText(`[${progress.location}]`)).toBeInTheDocument()
      expect(screen.getByText(progress.description)).toBeInTheDocument()
    })
  })

  test("닫기 버튼 클릭 시 closeFnc 함수가 호출되어야 한다", async () => {
    render(
      <TrackerStateBox
        isLoading={false}
        errDeliveryMessage=""
        deliveryState={deliveryState}
        progresses={progresses}
        closeFnc={closeFncMock}
      />
    )

    const closeButton = screen.getByRole("button", { name: "닫기" })
    await userEvent.click(closeButton)

    expect(closeFncMock).toHaveBeenCalled()
  })
})
