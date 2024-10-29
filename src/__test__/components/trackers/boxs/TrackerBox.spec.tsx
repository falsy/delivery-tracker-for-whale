/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TrackerBox from "@components/trackers/boxs/TrackerBox"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import useCarriers from "@hooks/useCarriers"
import TrackerDTO from "@core/dtos/TrackerDTO"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useError")
jest.mock("@hooks/useTrackers")
jest.mock("@hooks/useCarriers")

describe("TrackerBox 컴포넌트", () => {
  const tracker = new TrackerDTO({
    id: "aaa",
    carrierId: "carrierId",
    label: "initial label",
    trackingNumber: "123456789",
    memos: []
  })

  beforeEach(() => {
    ;(useDependencies as any).mockReturnValue({
      controllers: {
        tracker: {
          deleteTracker: jest.fn(),
          getDelivery: jest.fn()
        }
      }
    })
    ;(useError as any).mockReturnValue({
      setMessage: jest.fn()
    })
    ;(useTrackers as any).mockReturnValue({
      trackers: [tracker],
      getTrackers: jest.fn()
    })
    ;(useCarriers as any).mockReturnValue({
      carriers: [
        {
          id: "carrierId",
          name: "CarrierName",
          displayName: "CarrierName",
          popupURL: "https://example.com",
          isCrawlable: true
        }
      ]
    })
  })

  test("초기 렌더링 시 하위 컴포넌트들이 렌더링되어야 한다", () => {
    render(<TrackerBox trackerId={"aaa"} />)

    expect(
      screen.getByPlaceholderText(
        "이곳에 배송에 대한 간단한 메모를 적을 수 있어요."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    ).toBeInTheDocument()
    expect(screen.getByText("메모 추가")).toBeInTheDocument()
  })

  test("삭제 버튼 클릭 시 deleteTracker 함수가 호출되어야 한다", async () => {
    const { controllers } = useDependencies()
    ;(controllers.tracker.deleteTracker as jest.Mock).mockResolvedValue({
      isError: false
    })

    jest.spyOn(window, "confirm").mockReturnValue(true)

    render(<TrackerBox trackerId={"aaa"} />)
    const deleteButton = screen.getByRole("button", { name: "delete-button" })

    await userEvent.click(deleteButton)

    expect(controllers.tracker.deleteTracker).toHaveBeenCalledWith("aaa")
  })

  test("유효한 carrierId와 trackingNumber로 handleClickDelivery 호출 시 getDelivery 함수가 호출되어야 한다", async () => {
    const { controllers } = useDependencies()
    ;(controllers.tracker.getDelivery as jest.Mock).mockResolvedValue({
      isError: false,
      message: "",
      data: {
        from: { name: "Origin", time: "2024-01-01" },
        to: { name: "Destination", time: "2024-01-01" },
        progresses: [
          {
            state: { id: "b", name: "In Transit" },
            location: "Location",
            description: "description",
            time: "2024-01-01"
          }
        ],
        state: { id: "a", name: "Delivered" }
      }
    })

    render(<TrackerBox trackerId={"aaa"} />)
    const getDeliveryButton = screen.getByRole("button", {
      name: "submit-button"
    })

    await userEvent.click(getDeliveryButton)

    expect(controllers.tracker.getDelivery).toHaveBeenCalledWith(
      "carrierId",
      "123456789"
    )
  })

  test("getDelivery 호출 시 에러가 발생하면 에러 메시지가 표시되어야 한다", async () => {
    const { controllers } = useDependencies()
    const { setMessage } = useError()
    ;(controllers.tracker.getDelivery as jest.Mock).mockResolvedValue({
      isError: true,
      message: "Error occurred",
      data: null
    })

    render(<TrackerBox trackerId={"aaa"} />)
    const getDeliveryButton = screen.getByRole("button", {
      name: "submit-button"
    })

    await userEvent.click(getDeliveryButton)

    waitFor(() => {
      expect(setMessage).toHaveBeenCalled()
    })
  })
})
