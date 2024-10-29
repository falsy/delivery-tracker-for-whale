/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ICarrierDTO from "@core/dtos/interfaces/ICarrierDTO"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import TrackerNumberBox from "@components/trackers/boxs/TrackerNumberBox"
import TrackerDTO from "@core/dtos/TrackerDTO"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useError")
jest.mock("@hooks/useTrackers")

describe("TrackerNumberBox 컴포넌트", () => {
  const tracker = new TrackerDTO({
    id: "aaa",
    carrierId: "carrierId",
    label: "initial label",
    trackingNumber: "123456789",
    memos: []
  })

  const carrier: ICarrierDTO = {
    id: "carrier-id",
    isPopupEnabled: true,
    isCrawlable: true,
    popupURL: "https://example.com/track"
  } as ICarrierDTO

  const getDeliveryMock = jest.fn()

  beforeEach(() => {
    ;(useDependencies as any).mockReturnValue({
      controllers: {
        tracker: {
          updateTrackingNumber: jest.fn()
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
  })

  test("초기 렌더링 시 trackingNumber 값이 input 필드에 설정되어야 한다", () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackerId={"aaa"}
        getDelivery={getDeliveryMock}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    expect(input).toHaveValue("123456789")
  })

  test("운송장 번호 입력 값을 변경하면 updateTrackingNumber 함수가 호출되어야 한다", async () => {
    const { controllers } = useDependencies()
    ;(controllers.tracker.updateTrackingNumber as jest.Mock).mockResolvedValue({
      isError: false
    })

    render(
      <TrackerNumberBox
        carrier={carrier}
        trackerId={"aaa"}
        getDelivery={getDeliveryMock}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")

    await userEvent.clear(input)
    await userEvent.type(input, "987654321")

    expect(controllers.tracker.updateTrackingNumber).toHaveBeenCalledWith(
      tracker,
      "987654321"
    )
  })

  test("updateTrackingNumber에서 에러 발생 시 이전 값으로 복원되어야 한다", async () => {
    const { controllers } = useDependencies()
    const { setMessage } = useError()
    ;(controllers.tracker.updateTrackingNumber as jest.Mock).mockResolvedValue({
      isError: true
    })

    render(
      <TrackerNumberBox
        carrier={carrier}
        trackerId={"aaa"}
        getDelivery={getDeliveryMock}
      />
    )

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")

    await userEvent.clear(input)
    await userEvent.type(input, "987654321")

    await waitFor(() => {
      expect(input).toHaveValue("123456789")
    })
    expect(setMessage).toHaveBeenCalled()
  })

  test("isPopupEnabled가 true일 때 NewWindowButton이 렌더링되어야 한다", () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackerId={"aaa"}
        getDelivery={getDeliveryMock}
      />
    )

    expect(screen.getByRole("button", { name: /새창/i })).toBeInTheDocument()
  })

  test("isCrawlable이 true일 때 SubmitButton이 렌더링되어야 한다", () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackerId={"aaa"}
        getDelivery={getDeliveryMock}
      />
    )

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()
  })

  test("제출 버튼 클릭 시 getDelivery 함수가 호출되어야 한다", async () => {
    render(
      <TrackerNumberBox
        carrier={carrier}
        trackerId={"aaa"}
        getDelivery={getDeliveryMock}
      />
    )

    const submitButton = screen.getByRole("button", { name: /submit/i })
    await userEvent.click(submitButton)

    expect(getDeliveryMock).toHaveBeenCalledWith("carrier-id", "123456789")
  })
})
