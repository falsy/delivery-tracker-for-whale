/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TrackerBox from "@containers/trackers/boxs/TrackerBox"
import useError from "@hooks/useError"
import useCarriers from "@hooks/useCarriers"
import TrackerDTO from "@adapters/dtos/TrackerDTO"
import useTrackers from "@hooks/useTrackers"

jest.mock("@hooks/useError")
jest.mock("@hooks/useCarriers")
jest.mock("@hooks/useTrackers")

describe("TrackerBox 컴포넌트", () => {
  const tracker = new TrackerDTO({
    id: "aaa",
    carrierId: "carrierId",
    label: "initial label",
    trackingNumber: "123456789",
    memos: []
  })

  const carrier = {
    id: "carrierId",
    name: "CarrierName",
    displayName: "CarrierName",
    popupURL: "https://example.com",
    isCrawlable: true
  }

  const deleteTracker = jest.fn()

  beforeEach(() => {
    ;(useError as any).mockReturnValue({
      setMessage: jest.fn()
    })
    ;(useCarriers as any).mockReturnValue({
      carriers: [carrier]
    })
    ;(useTrackers as any).mockReturnValue({
      isPending: false,
      delivery: null,
      patchTracker: jest.fn(),
      deliveryErrorMessage: "",
      getDelivery: jest.fn(),
      clearDelivery: jest.fn()
    })
  })

  test("초기 렌더링 시 하위 컴포넌트들이 렌더링되어야 한다", () => {
    render(<TrackerBox tracker={tracker} deleteTracker={deleteTracker} />)

    expect(
      screen.getByPlaceholderText("배송에 대한 간단한 메모를 적을 수 있어요.")
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    ).toBeInTheDocument()
    expect(screen.getByText("메모 추가")).toBeInTheDocument()
  })

  test("삭제 버튼 클릭 시 deleteTracker 함수가 호출되어야 한다", async () => {
    jest.spyOn(window, "confirm").mockReturnValue(true)

    render(<TrackerBox tracker={tracker} deleteTracker={deleteTracker} />)
    const deleteButton = screen.getByRole("button", { name: "delete-button" })

    await userEvent.click(deleteButton)

    expect(deleteTracker).toHaveBeenCalledWith("aaa")
  })

  test("유효한 carrierId와 trackingNumber로 handleClickDelivery 호출 시 getDelivery 함수가 호출되어야 한다", async () => {
    const getDelivery = jest.fn()
    ;(useTrackers as any).mockReturnValue({
      isPending: false,
      delivery: null,
      patchTracker: jest.fn(),
      deliveryErrorMessage: "",
      getDelivery,
      clearDelivery: jest.fn()
    })

    render(<TrackerBox tracker={tracker} deleteTracker={deleteTracker} />)
    const getDeliveryButton = screen.getByRole("button", {
      name: "submit-button"
    })

    await userEvent.click(getDeliveryButton)

    expect(getDelivery).toHaveBeenCalledWith(carrier, "123456789")
  })

  test("getDelivery 호출 시 에러가 발생하면 에러 메시지가 표시되어야 한다", async () => {
    const getDelivery = jest.fn()
    ;(useTrackers as any).mockReturnValue({
      isPending: false,
      delivery: null,
      patchTracker: jest.fn(),
      deliveryErrorMessage: "",
      getDelivery,
      clearDelivery: jest.fn()
    })
    getDelivery.mockResolvedValue({
      isError: true,
      message: "Error occurred",
      data: null
    })

    const { setMessage } = useError()

    render(<TrackerBox tracker={tracker} deleteTracker={deleteTracker} />)
    const getDeliveryButton = screen.getByRole("button", {
      name: "submit-button"
    })

    await userEvent.click(getDeliveryButton)

    waitFor(() => {
      expect(setMessage).toHaveBeenCalled()
    })
  })
})
